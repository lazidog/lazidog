import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  CORS_ORIGINS: z.string(),

  AUTH_BASE_URL: z.string().url(),
  WEB_BASE_URL: z.string().url(),

  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_ACCESS_TTL_SECONDS: z.coerce.number(),

  COOKIE_SECURE: z.coerce.boolean(),
  COOKIE_DOMAIN: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
});

type EnvConfig = z.infer<typeof envSchema>;

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {
    const rawEnv = {
      PORT: this.configService.get('PORT'),
      NODE_ENV: this.configService.get('NODE_ENV'),
      CORS_ORIGINS: this.configService.get('CORS_ORIGINS'),

      AUTH_BASE_URL: this.configService.get('AUTH_BASE_URL'),
      WEB_BASE_URL: this.configService.get('WEB_BASE_URL'),

      JWT_ACCESS_SECRET: this.configService.get('JWT_ACCESS_SECRET'),
      JWT_ACCESS_TTL_SECONDS: this.configService.get('JWT_ACCESS_TTL_SECONDS'),

      COOKIE_SECURE: this.configService.get('COOKIE_SECURE'),
      COOKIE_DOMAIN: this.configService.get('COOKIE_DOMAIN'),

      GOOGLE_CLIENT_ID: this.configService.get('GOOGLE_CLIENT_ID'),
      GOOGLE_CLIENT_SECRET: this.configService.get('GOOGLE_CLIENT_SECRET'),
    };

    try {
      envSchema.parse(rawEnv);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const missingVars = error.issues
          .map((err) => `  - ${err.path.join('.')}: ${err.message}`)
          .join('\n');
        throw new Error(
          `Environment validation failed:\n${missingVars}\n\nPlease check your .env file.`
        );
      }
      throw error;
    }
  }

  get(key: keyof EnvConfig): string {
    return this.configService.get<string>(key)!;
  }

  getNumber(key: keyof EnvConfig): number {
    return this.configService.get<number>(key)!;
  }

  getBoolean(key: keyof EnvConfig): boolean {
    return this.configService.get<boolean>(key)!;
  }
}
