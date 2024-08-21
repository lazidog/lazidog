# database

## Initial (for memorize)

```sh
pnpm prisma init # init schema.prisma
pnpm prisma generate # generate Prisma Client
# ✔ Generated Prisma Client (v5.13.0) to ./../../node_modules/.pnpm/@prisma+client@5.13.0_prisma@5.13.0/node_modules/@prisma/client in 42ms
# import { PrismaClient } from '@prisma/client'
# const prisma = new PrismaClient()
pnpm build
```

## Execute migration

### On production

(TBD)

### On local development

Move to `db/workspace/local` or `db/workspace/prod` and then execute.

- Schema migration

```sh
cd packages/db/workspace/local
pnpm prisma migrate dev
```

- Data migration

```sh
pnpm scaffold
pnpm ts-node prisma/data-migrations/20231101044221_example
```
