import { PrismaClient } from '@prisma/client';

export async function seedUsers(prisma: PrismaClient) {
  await prisma.user.createMany({
    data: [
      {
        email: 'tientien@gmail.com',
      },
    ],
  });

  return await prisma.user.findMany();
}
