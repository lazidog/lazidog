import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { apiServerEnvSchema, formatZodEnvError } from '@lazidog/shared';
import type { ApiServerEnv } from '@lazidog/shared';
import { z } from 'zod';

@Injectable()
export class AppConfigService {
  private readonly env: ApiServerEnv;

  constructor(private configService: ConfigService) {
    const rawEnv = {
      PORT: this.configService.get('PORT') ?? '4000',
      NODE_ENV: this.configService.get('NODE_ENV'),
      CORS_ORIGINS: this.configService.get('CORS_ORIGINS'),
      JWT_ACCESS_SECRET: this.configService.get('JWT_ACCESS_SECRET'),
      SENTRY_DSN: this.configService.get('SENTRY_DSN'),
    };

    try {
      this.env = apiServerEnvSchema.parse(rawEnv);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Environment validation failed:\n${formatZodEnvError(error)}\n\nPlease check your .env file.`
        );
      }
      throw error;
    }
  }

  get<K extends keyof ApiServerEnv>(key: K): ApiServerEnv[K] {
    return this.env[key];
  }

  getNumber(key: keyof ApiServerEnv): number {
    return Number(this.env[key]);
  }
}
