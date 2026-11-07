import { z } from 'zod';
import { userSchema } from './user';

export const sessionSchema = z.object({
  user: userSchema,
});
export type Session = z.infer<typeof sessionSchema>;

export const loginRedirectQuerySchema = z.object({
  returnTo: z.string().min(1).default('/'),
});
export type LoginRedirectQuery = z.infer<typeof loginRedirectQuerySchema>;

export const oauthCallbackQuerySchema = z.object({
  state: z.string().min(1).default('/'),
});
export type OAuthCallbackQuery = z.infer<typeof oauthCallbackQuerySchema>;

export const refreshSessionResponseSchema = z.object({
  refreshed: z.literal(true),
});
export type RefreshSessionResponse = z.infer<typeof refreshSessionResponseSchema>;

export const logoutResponseSchema = z.object({
  ok: z.literal(true),
});
export type LogoutResponse = z.infer<typeof logoutResponseSchema>;

export const authResponseSchemas = {
  session: sessionSchema,
  refresh: refreshSessionResponseSchema,
  logout: logoutResponseSchema,
} as const;
