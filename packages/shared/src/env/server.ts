import { z } from 'zod';
import { ACCESS_TOKEN_TTL_SECONDS, COOKIE_DOMAIN } from '../constants/auth';

export const nodeEnvSchema = z.enum(['development', 'production', 'test']);

export const baseServerEnvSchema = z.object({
  NODE_ENV: nodeEnvSchema.default('development'),
  PORT: z.coerce.number().int().positive(),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
  SENTRY_DSN: z.string().optional().default(''),
});

export const authServerEnvSchema = baseServerEnvSchema.extend({
  AUTH_BASE_URL: z.string().url(),
  WEB_BASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().positive().default(ACCESS_TOKEN_TTL_SECONDS),
  COOKIE_DOMAIN: z.literal(COOKIE_DOMAIN).default(COOKIE_DOMAIN),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

export const apiServerEnvSchema = baseServerEnvSchema.extend({
  JWT_ACCESS_SECRET: z.string().min(32),
});

export const workerServerEnvSchema = z.object({
  REDIS_URL: z.string().url().default('redis://localhost:6379'),
  NODE_ENV: nodeEnvSchema.default('development'),
  SENTRY_DSN: z.string().optional().default(''),
});

export type AuthServerEnv = z.infer<typeof authServerEnvSchema>;
export type ApiServerEnv = z.infer<typeof apiServerEnvSchema>;
export type WorkerServerEnv = z.infer<typeof workerServerEnvSchema>;

export function formatZodEnvError(error: z.ZodError) {
  return error.issues.map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`).join('\n');
}
