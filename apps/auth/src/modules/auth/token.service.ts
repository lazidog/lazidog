import { accessTokenClaimsSchema, AUTH_JWT } from '@lazidog/shared';
import type { AccessTokenClaims } from '@lazidog/shared';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AppConfigService } from '../shared/services/app-config.service';

@Injectable()
export class TokenService {
  constructor(private readonly config: AppConfigService) {}

  signAccessToken(claims: AccessTokenClaims) {
    const ttl = this.config.getNumber('JWT_ACCESS_TTL_SECONDS');
    return jwt.sign(claims, this.config.get('JWT_ACCESS_SECRET'), {
      expiresIn: `${ttl}s`,
      audience: AUTH_JWT.audience,
      issuer: AUTH_JWT.issuer,
    });
  }

  verifyAccessToken(token: string): AccessTokenClaims {
    const decoded = jwt.verify(token, this.config.get('JWT_ACCESS_SECRET'), {
      audience: AUTH_JWT.audience,
      issuer: AUTH_JWT.issuer,
    });
    return accessTokenClaimsSchema.parse(decoded);
  }
}
