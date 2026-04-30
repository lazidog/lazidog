import jwt from 'jsonwebtoken';
import { getRuntimeEnv } from '@lazidog/config';

export type AccessTokenClaims = {
  sub: string;
  role: 'user' | 'admin';
  sid: string;
};

export class TokenService {
  private readonly env = getRuntimeEnv();

  verifyAccessToken(token: string): AccessTokenClaims {
    return jwt.verify(token, this.env.JWT_ACCESS_SECRET, {
      audience: 'lazidog',
      issuer: 'auth',
    }) as AccessTokenClaims;
  }
}

