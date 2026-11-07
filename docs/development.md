# Development

## Commands

- `yarn dev`: run all app/package dev tasks.
- `yarn build`: build every workspace.
- `yarn lint`: run Biome checks.
- `yarn typecheck`: run strict TypeScript checks.
- `yarn test`: run workspace tests.

## Environment

Copy `.env.example` to `.env`. Server apps validate environment at startup with shared Zod schemas.

Use app-specific `PORT` overrides when running services separately:

- API defaults to `4000`.
- Auth defaults to `4002`.

## Database

Prisma schema lives in `packages/db/prisma/schema.prisma`.

Use UUID primary keys and keep auth tables modular so future products can add relations without coupling product data to identity internals.

## Events

Use BullMQ for real async work: email, notifications, slow jobs, and future game integration. Keep payloads validated and queue-specific.
