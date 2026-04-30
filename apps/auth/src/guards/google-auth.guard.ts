import { Injectable, NotImplementedException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getRuntimeEnv } from '@lazidog/config';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  canActivate(context: ExecutionContext) {
    const env = getRuntimeEnv();
    if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
      throw new NotImplementedException('Google OAuth is not configured');
    }
    return super.canActivate(context) as any;
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<any>();
    const state = typeof req?.query?.state === 'string' ? req.query.state : undefined;
    return state ? { state } : {};
  }
}
