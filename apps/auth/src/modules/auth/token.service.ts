import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AppConfigService } from '../shared/services/app-config.service';

export type AccessTokenClaims = {
  sub: string;
  role: 'user' | 'admin';
  sid: string;
};

@Injectable()
export class TokenService {
  constructor(private readonly config: AppConfigService) {}

  signAccessToken(claims: AccessTokenClaims) {
    const ttl = this.config.getNumber('JWT_ACCESS_TTL_SECONDS');
    console.log('Signing token with TTL:', ttl);
    return jwt.sign(claims, this.config.get('JWT_ACCESS_SECRET'), {
      expiresIn: `${ttl}s`,
      audience: 'lazidog',
      issuer: 'auth',
    });
  }

  verifyAccessToken(token: string): AccessTokenClaims {
    return jwt.verify(token, this.config.get('JWT_ACCESS_SECRET'), {
      audience: 'lazidog',
      issuer: 'auth',
    }) as AccessTokenClaims;
  }
}
