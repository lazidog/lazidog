import { z } from 'zod';
import { userSchema } from './user';

export const sessionSchema = z.object({
  user: userSchema,
});
export type Session = z.infer<typeof sessionSchema>;

export const loginRedirectQuerySchema = z.object({
  returnTo: z.string().min(1).default('/'),
});

