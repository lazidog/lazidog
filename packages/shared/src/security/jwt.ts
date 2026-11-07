import { z } from 'zod';

export const accessTokenClaimsSchema = z.object({
  sub: z.string().uuid(),
  role: z.enum(['user', 'admin']),
  sid: z.string().uuid(),
});

export type AccessTokenClaims = z.infer<typeof accessTokenClaimsSchema>;
