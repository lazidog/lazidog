import { z } from 'zod';

export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
  requestId: z.string().optional(),
});

export const apiOkSchema = z.object({
  success: z.literal(true),
  data: z.unknown(),
});

export const apiFailSchema = z.object({
  success: z.literal(false),
  error: apiErrorSchema,
});

export const apiResponseSchema = z.union([apiOkSchema, apiFailSchema]);

export type ApiError = z.infer<typeof apiErrorSchema>;
export type ApiResponse<T> = { success: true; data: T } | { success: false; error: ApiError };
