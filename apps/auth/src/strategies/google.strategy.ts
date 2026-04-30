import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, type VerifyCallback } from 'passport-google-oauth20';
import { getRuntimeEnv } from '@lazidog/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const env = getRuntimeEnv();

    super({
      // Guard blocks usage when not configured; placeholders keep the app bootable.
      clientID: env.GOOGLE_CLIENT_ID || 'disabled',
      clientSecret: env.GOOGLE_CLIENT_SECRET || 'disabled',
      callbackURL: `${env.AUTH_BASE_URL}/v1/login/google/callback`,
      scope: ['profile', 'email'],
      passReqToCallback: false,
    });
  }

  validate(_accessToken: string, _refreshToken: string, profile: unknown, done: VerifyCallback) {
    done(null, profile);
  }
}
