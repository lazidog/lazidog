import {
  accessTokenClaimsSchema,
  AUTH_JWT,
  cookieNames,
  type AccessTokenClaims,
} from '@lazidog/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppConfigService } from '../shared/services/app-config.service';

@Injectable()
export class HeaderAuthGuard implements CanActivate {
  constructor(private readonly config: AppConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const token = this.extractAccessToken(req);
    if (!token) {
      throw new UnauthorizedException('Not authenticated');
    }

    try {
      const decoded = jwt.verify(token, this.config.get('JWT_ACCESS_SECRET'), {
        audience: AUTH_JWT.audience,
        issuer: AUTH_JWT.issuer,
      });
      req.user = accessTokenClaimsSchema.parse(decoded);
      return true;
    } catch {
      throw new UnauthorizedException('Not authenticated');
    }
  }

  private extractAccessToken(req: Request): string | undefined {
    const cookieToken = req.cookies?.[cookieNames.access];
    if (typeof cookieToken === 'string' && cookieToken.length > 0) return cookieToken;

    const authorization = req.header('authorization') ?? req.headers.authorization;
    if (typeof authorization !== 'string') return undefined;
    const [scheme, token] = authorization.split(' ');
    return scheme.toLowerCase() === 'bearer' && token ? token : undefined;
  }
}

export type AuthUser = AccessTokenClaims;
