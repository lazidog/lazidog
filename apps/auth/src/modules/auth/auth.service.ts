import { randomBytes, randomUUID } from 'node:crypto';
import { getPrisma } from '@lazidog/db';
import {
  cookieNames,
  getAuthCookieOptions,
  logoutResponseSchema,
  REFRESH_TOKEN_TTL_DAYS,
  refreshSessionResponseSchema,
  sessionSchema,
  sha256Hex,
  userSchema,
} from '@lazidog/shared';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AppConfigService } from '../shared/services/app-config.service';
import { TokenService } from './token.service';

function safeReturnTo(config: AppConfigService, returnTo: string): string {
  // Allow absolute URLs only if they match WEB_BASE_URL; otherwise fallback to WEB_BASE_URL.
  try {
    const u = new URL(returnTo, config.get('WEB_BASE_URL'));
    const allowedOrigin = new URL(config.get('WEB_BASE_URL')).origin;
    if (u.origin !== allowedOrigin) return config.get('WEB_BASE_URL');
    return u.toString();
  } catch {
    return config.get('WEB_BASE_URL');
  }
}

@Injectable()
export class AuthService {
  private readonly prisma = getPrisma();

  constructor(
    private readonly config: AppConfigService,
    private readonly tokens: TokenService
  ) {}

  async issueSessionAndRedirect(opts: {
    res: Response;
    returnTo: string;
    provider: string;
    email?: string;
    name?: string;
    imageUrl?: string;
    providerAccountId?: string;
  }) {
    if (!opts.email) throw new BadRequestException('Missing email from provider');

    const user = await this.prisma.user.upsert({
      where: { email: opts.email.toLowerCase() },
      create: {
        email: opts.email.toLowerCase(),
        name: opts.name ?? null,
        imageUrl: opts.imageUrl ?? null,
        role: 'user',
      },
      update: {
        name: opts.name ?? undefined,
        imageUrl: opts.imageUrl ?? undefined,
      },
    });

    if (opts.provider !== 'google' || !opts.providerAccountId) {
      throw new BadRequestException('Google account profile is incomplete');
    }

    await this.prisma.account.upsert({
      where: {
        provider_providerAccountId: {
          provider: opts.provider,
          providerAccountId: opts.providerAccountId,
        },
      },
      create: {
        userId: user.id,
        provider: opts.provider,
        providerAccountId: opts.providerAccountId,
      },
      update: { userId: user.id },
    });

    const sid = randomUUID();
    const accessToken = this.tokens.signAccessToken({
      sub: user.id,
      role: user.role,
      sid,
    });
    const refreshToken = randomBytes(32).toString('hex');
    const refreshTokenHash = sha256Hex(refreshToken);
    const refreshExpiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash,
        expiresAt: refreshExpiresAt,
      },
    });

    this.setSessionCookies(opts.res, accessToken, refreshToken);
    opts.res.redirect(safeReturnTo(this.config, opts.returnTo));
  }

  async getSession(req: Request) {
    const access = req.cookies?.[cookieNames.access];
    if (!access) throw new UnauthorizedException('Not authenticated');
    const claims = this.tokens.verifyAccessToken(access);
    const user = await this.prisma.user.findUnique({
      where: { id: claims.sub },
    });
    if (!user) throw new UnauthorizedException('Not authenticated');

    return sessionSchema.parse({
      user: userSchema.parse({
        id: user.id,
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }),
    });
  }

  async refresh(req: Request, res: Response) {
    const refresh = req.cookies?.[cookieNames.refresh];
    if (!refresh) throw new UnauthorizedException('Missing refresh token');

    const refreshHash = sha256Hex(refresh);
    const found = await this.prisma.refreshToken.findUnique({
      where: { tokenHash: refreshHash },
    });
    if (!found) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    if (found.revokedAt) {
      await this.prisma.refreshToken.updateMany({
        where: { userId: found.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      throw new UnauthorizedException('Invalid refresh token');
    }
    if (found.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const newRefresh = randomBytes(32).toString('hex');
    const newHash = sha256Hex(newRefresh);
    const newExpiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);

    await this.prisma.$transaction(async (tx) => {
      const revoked = await tx.refreshToken.updateMany({
        where: { id: found.id, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      if (revoked.count !== 1) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      await tx.refreshToken.create({
        data: {
          userId: found.userId,
          tokenHash: newHash,
          expiresAt: newExpiresAt,
          rotatedFromId: found.id,
        },
      });
    });

    const user = await this.prisma.user.findUnique({
      where: { id: found.userId },
    });
    if (!user) throw new UnauthorizedException('Invalid refresh token');

    const sid = randomUUID();
    const newAccess = this.tokens.signAccessToken({
      sub: user.id,
      role: user.role,
      sid,
    });

    this.setSessionCookies(res, newAccess, newRefresh);

    return refreshSessionResponseSchema.parse({ refreshed: true });
  }

  async logout(req: Request, res: Response) {
    const refresh = req.cookies?.[cookieNames.refresh];
    if (refresh) {
      const refreshHash = sha256Hex(refresh);
      await this.prisma.refreshToken
        .update({
          where: { tokenHash: refreshHash },
          data: { revokedAt: new Date() },
        })
        .catch(() => undefined);
    }

    const cookieOpts = getAuthCookieOptions(this.config.get('COOKIE_DOMAIN'));

    res.clearCookie(cookieNames.access, cookieOpts);
    res.clearCookie(cookieNames.refresh, cookieOpts);
    return logoutResponseSchema.parse({ ok: true });
  }

  private setSessionCookies(res: Response, accessToken: string, refreshToken: string) {
    const cookieOpts = getAuthCookieOptions(this.config.get('COOKIE_DOMAIN'));

    res.cookie(cookieNames.access, accessToken, {
      ...cookieOpts,
      maxAge: this.config.getNumber('JWT_ACCESS_TTL_SECONDS') * 1000,
    });
    res.cookie(cookieNames.refresh, refreshToken, {
      ...cookieOpts,
      maxAge: REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000,
    });
  }
}
