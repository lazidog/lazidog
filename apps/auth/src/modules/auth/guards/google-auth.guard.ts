import { Injectable, NotImplementedException } from '@nestjs/common';
import type { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppConfigService } from '../../shared/services/app-config.service';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private readonly config: AppConfigService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    if (!this.config.getBoolean('GOOGLE_CLIENT_ID') || !this.config.get('GOOGLE_CLIENT_SECRET')) {
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
