import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { authServerEnvSchema, formatZodEnvError } from '@lazidog/shared';
import type { AuthServerEnv } from '@lazidog/shared';
import { z } from 'zod';

@Injectable()
export class AppConfigService {
  private readonly env: AuthServerEnv;

  constructor(private configService: ConfigService) {
    const rawEnv = {
      PORT: this.configService.get('PORT') ?? '4002',
      NODE_ENV: this.configService.get('NODE_ENV'),
      CORS_ORIGINS: this.configService.get('CORS_ORIGINS'),

      AUTH_BASE_URL: this.configService.get('AUTH_BASE_URL'),
      WEB_BASE_URL: this.configService.get('WEB_BASE_URL'),

      JWT_ACCESS_SECRET: this.configService.get('JWT_ACCESS_SECRET'),
      JWT_ACCESS_TTL_SECONDS: this.configService.get('JWT_ACCESS_TTL_SECONDS'),

      COOKIE_DOMAIN: this.configService.get('COOKIE_DOMAIN'),

      GOOGLE_CLIENT_ID: this.configService.get('GOOGLE_CLIENT_ID'),
      GOOGLE_CLIENT_SECRET: this.configService.get('GOOGLE_CLIENT_SECRET'),
      SENTRY_DSN: this.configService.get('SENTRY_DSN'),
    };

    try {
      this.env = authServerEnvSchema.parse(rawEnv);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Environment validation failed:\n${formatZodEnvError(error)}\n\nPlease check your .env file.`
        );
      }
      throw error;
    }
  }

  get<K extends keyof AuthServerEnv>(key: K): AuthServerEnv[K] {
    return this.env[key];
  }

  getNumber(key: keyof AuthServerEnv): number {
    return Number(this.env[key]);
  }
}
