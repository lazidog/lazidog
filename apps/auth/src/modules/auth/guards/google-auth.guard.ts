import { Injectable, NotImplementedException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { loginRedirectQuerySchema } from '@lazidog/shared';
import type { Request } from 'express';
import { AppConfigService } from '../../shared/services/app-config.service';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private readonly config: AppConfigService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    if (!this.config.get('GOOGLE_CLIENT_ID') || !this.config.get('GOOGLE_CLIENT_SECRET')) {
      throw new NotImplementedException('Google OAuth is not configured');
    }
    return super.canActivate(context);
  }

  getAuthenticateOptions(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const state =
      typeof req.query.returnTo === 'string'
        ? req.query.returnTo
        : typeof req.query.state === 'string'
          ? req.query.state
          : undefined;
    const parsed = loginRedirectQuerySchema.parse({ returnTo: state });
    return { state: parsed.returnTo };
  }
}
