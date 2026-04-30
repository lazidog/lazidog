import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { createHash, randomBytes, randomUUID } from 'crypto';
import { getRuntimeEnv } from '@lazidog/config';
import { getPrisma } from '@lazidog/db';
import { cookieNames, getAuthCookieOptions } from '@lazidog/utils';
import { userSchema } from '@lazidog/shared';
import { TokenService } from './token.service';

function sha256Hex(input: string) {
  return createHash('sha256').update(input).digest('hex');
}

function safeReturnTo(env: ReturnType<typeof getRuntimeEnv>, returnTo: string): string {
  // Allow absolute URLs only if they match WEB_BASE_URL; otherwise fallback to WEB_BASE_URL.
  try {
    const u = new URL(returnTo, env.WEB_BASE_URL);
    const allowedOrigin = new URL(env.WEB_BASE_URL).origin;
    if (u.origin !== allowedOrigin) return env.WEB_BASE_URL;
    return u.toString();
  } catch {
    return env.WEB_BASE_URL;
  }
}

@Injectable()
export class AuthService {
  private readonly env = getRuntimeEnv();
  private readonly prisma = getPrisma();

  constructor(private readonly tokens: TokenService) {}

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

    if (opts.provider !== 'dev' && opts.providerAccountId) {
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
    }

    const sid = randomUUID();
    const accessToken = this.tokens.signAccessToken({ sub: user.id, role: user.role, sid });
    const refreshToken = randomBytes(32).toString('hex');
    const refreshTokenHash = sha256Hex(refreshToken);

    const refreshTtlDays = 30;
    const refreshExpiresAt = new Date(Date.now() + refreshTtlDays * 24 * 60 * 60 * 1000);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshTokenHash,
        expiresAt: refreshExpiresAt,
      },
    });

    const cookieOpts = getAuthCookieOptions({
      secure: this.env.COOKIE_SECURE,
      domain: this.env.COOKIE_DOMAIN || undefined,
    });

    opts.res.cookie(cookieNames.access, accessToken, {
      ...cookieOpts,
      maxAge: this.env.JWT_ACCESS_TTL_SECONDS * 1000,
    });
    opts.res.cookie(cookieNames.refresh, refreshToken, {
      ...cookieOpts,
      maxAge: refreshTtlDays * 24 * 60 * 60 * 1000,
    });

    opts.res.redirect(safeReturnTo(this.env, opts.returnTo));
  }

  async getSession(req: Request) {
    const access = req.cookies?.[cookieNames.access];
    if (!access) throw new UnauthorizedException('Not authenticated');
    const claims = this.tokens.verifyAccessToken(access);
    const user = await this.prisma.user.findUnique({ where: { id: claims.sub } });
    if (!user) throw new UnauthorizedException('Not authenticated');

    return {
      user: userSchema.parse({
        id: user.id,
        email: user.email,
        name: user.name,
        imageUrl: user.imageUrl,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }),
    };
  }

  async refresh(req: Request, res: Response) {
    const refresh = req.cookies?.[cookieNames.refresh];
    if (!refresh) throw new UnauthorizedException('Missing refresh token');

    const refreshHash = sha256Hex(refresh);
    const found = await this.prisma.refreshToken.findUnique({ where: { tokenHash: refreshHash } });
    if (!found || found.revokedAt || found.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Rotate: revoke old, create new token linked to old.
    const newRefresh = randomBytes(32).toString('hex');
    const newHash = sha256Hex(newRefresh);
    const refreshTtlDays = 30;
    const newExpiresAt = new Date(Date.now() + refreshTtlDays * 24 * 60 * 60 * 1000);

    await this.prisma.$transaction([
      this.prisma.refreshToken.update({
        where: { id: found.id },
        data: { revokedAt: new Date() },
      }),
      this.prisma.refreshToken.create({
        data: {
          userId: found.userId,
          tokenHash: newHash,
          expiresAt: newExpiresAt,
          rotatedFromId: found.id,
        },
      }),
    ]);

    const user = await this.prisma.user.findUnique({ where: { id: found.userId } });
    if (!user) throw new UnauthorizedException('Invalid refresh token');

    const sid = randomUUID();
    const newAccess = this.tokens.signAccessToken({ sub: user.id, role: user.role, sid });

    const cookieOpts = getAuthCookieOptions({
      secure: this.env.COOKIE_SECURE,
      domain: this.env.COOKIE_DOMAIN || undefined,
    });

    res.cookie(cookieNames.access, newAccess, {
      ...cookieOpts,
      maxAge: this.env.JWT_ACCESS_TTL_SECONDS * 1000,
    });
    res.cookie(cookieNames.refresh, newRefresh, {
      ...cookieOpts,
      maxAge: refreshTtlDays * 24 * 60 * 60 * 1000,
    });

    return { ok: true };
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

    const cookieOpts = getAuthCookieOptions({
      secure: this.env.COOKIE_SECURE,
      domain: this.env.COOKIE_DOMAIN || undefined,
    });

    res.clearCookie(cookieNames.access, cookieOpts);
    res.clearCookie(cookieNames.refresh, cookieOpts);
    return { ok: true };
  }
}
