import type { AccessTokenClaims } from '../security/jwt';

declare module 'express-serve-static-core' {
  interface Request {
    requestId?: string;
    user?: AccessTokenClaims;
  }
}
