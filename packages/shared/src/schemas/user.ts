import { z } from 'zod';
import { roleSchema, uuidSchema } from './common';

export const userSchema = z.object({
  id: uuidSchema,
  email: z.string().email(),
  name: z.string().min(1).nullable(),
  imageUrl: z.string().url().nullable(),
  role: roleSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;

export const meResponseSchema = userSchema.pick({
  id: true,
  email: true,
  name: true,
  imageUrl: true,
  role: true,
});
export type MeResponse = z.infer<typeof meResponseSchema>;
