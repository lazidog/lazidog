import { z } from 'zod';

export const queueNames = {
  email: 'email',
  notification: 'notification',
  async: 'async',
} as const;

export const sendEmailJobSchema = z.object({
  to: z.string().email(),
  template: z.string().min(1),
  payload: z.record(z.unknown()).default({}),
});

export const notificationJobSchema = z.object({
  userId: z.string().uuid(),
  type: z.string().min(1),
  payload: z.record(z.unknown()).default({}),
});

export type SendEmailJob = z.infer<typeof sendEmailJobSchema>;
export type NotificationJob = z.infer<typeof notificationJobSchema>;
