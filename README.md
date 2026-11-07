# lazidog platform monorepo

Production-minded foundation for a modular platform with shared identity and future product surfaces.

- `apps/web` -> Next.js frontend
- `apps/api` -> NestJS API
- `apps/auth` -> NestJS Google OAuth service
- `apps/worker` -> BullMQ workers
- `apps/proxy` -> Cloudflare Worker image proxy
- `packages/shared` -> contracts, env validation, constants, helpers
- `packages/db` -> Prisma/PostgreSQL

## Quickstart

```bash
corepack enable
yarn
cp .env.example .env
docker compose up -d postgres redis
yarn workspace @lazidog/db prisma:gen
yarn workspace @lazidog/db prisma:db:push
yarn dev
```

Open:

- Web: http://localhost:3000
- API: http://localhost:4000/v1/health
- Auth: http://localhost:4002/v1/session
- Proxy: http://localhost:8788

For browser cookies with `.lazidog.dev`, use local hostnames that resolve to `127.0.0.1` instead of plain `localhost`.

## Docker Compose

```bash
cp .env.example .env
docker compose up --build
```

## Quality

```bash
yarn lint
yarn typecheck
yarn test
yarn build
```

Docs:

- `docs/architecture.md`
- `docs/auth-flow.md`
- `docs/development.md`
- `docs/code-conventions.md`
