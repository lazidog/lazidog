import 'dotenv-flow/config';

import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!email) {
    console.log('ADMIN_EMAIL not set; skipping seed.');
    await prisma.$disconnect();
    return;
  }

  await prisma.user.upsert({
    where: { email },
    create: { email, role: 'admin', name: 'Admin', imageUrl: null },
    update: { role: 'admin' },
  });

  await prisma.$disconnect();
  console.log(`Seeded admin role for ${email}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

