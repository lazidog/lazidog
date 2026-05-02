import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type VerifyCallback } from 'passport-google-oauth20';
import { AppConfigService } from '../../shared/services/app-config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly config: AppConfigService) {
    super({
      // Guard blocks usage when not configured; placeholders keep the app bootable.
      clientID: config.get('GOOGLE_CLIENT_ID') || 'disabled',
      clientSecret: config.get('GOOGLE_CLIENT_SECRET') || 'disabled',
      callbackURL: `${config.get('AUTH_BASE_URL')}/v1/login/google/callback`,
      scope: ['profile', 'email'],
      passReqToCallback: false,
    });
  }

  validate(_accessToken: string, _refreshToken: string, profile: unknown, done: VerifyCallback) {
    done(null, profile as any);
  }
}
