import { PrismaClient } from '@prisma/client';

let prismaSingleton: PrismaClient | undefined;

export function getPrisma(): PrismaClient {
  if (!prismaSingleton) {
    prismaSingleton = new PrismaClient();
  }
  return prismaSingleton;
}

export type { PrismaClient };
export * from '@prisma/client';

