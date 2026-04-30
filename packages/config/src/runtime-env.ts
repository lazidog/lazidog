import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),

  DATABASE_URL: z.string().min(1),

  COOKIE_DOMAIN: z.string().optional().default(''),
  COOKIE_SECURE: z.preprocess((v) => (v === 'true' ? true : false), z.boolean()).default(false),

  JWT_ACCESS_SECRET: z.string().min(16),
  JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().min(60).max(60 * 60).default(900),

  GATEWAY_INTERNAL_SECRET: z.string().min(16).default('dev_gateway_secret_change_me'),

  GOOGLE_CLIENT_ID: z.string().optional().default(''),
  GOOGLE_CLIENT_SECRET: z.string().optional().default(''),
  GOOGLE_CALLBACK_URL: z.string().optional().default(''),

  WEB_BASE_URL: z.string().url(),
  AUTH_BASE_URL: z.string().url(),
  GATEWAY_BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  SENTRY_DSN: z.string().optional().default('')
});

export type RuntimeEnv = z.infer<typeof envSchema>;

export function getRuntimeEnv(raw: NodeJS.ProcessEnv = process.env): RuntimeEnv {
  const parsed = envSchema.safeParse(raw);
  if (!parsed.success) {
    const msg = parsed.error.issues
      .map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid environment:\n${msg}`);
  }
  return parsed.data;
}
