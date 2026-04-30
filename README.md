# lazidog platform monorepo

Production-minded MVP scaffold for a multi-surface platform with shared SSO across subdomains:

- `lazidog.dev` -> `apps/web`
- `api.lazidog.dev` -> `apps/api`
- `auth.lazidog.dev` -> `apps/auth`
- `gateway.lazidog.dev` -> `apps/gateway`
- `proxy.lazidog.dev` -> `apps/proxy` (Cloudflare Worker)

## Quickstart (local)

Prereqs: Node 20+, Docker, Yarn (Corepack).

```bash
corepack enable
yarn
cp .env.example .env
docker compose up -d postgres
yarn workspace @lazidog/db prisma:generate
yarn workspace @lazidog/db prisma:push
yarn dev
```

Open:

- Web: http://localhost:3000
- Gateway: http://localhost:4001/v1/health
- API (direct): http://localhost:4000/v1/health
- Auth (direct): http://localhost:4002/v1/session

Dev SSO note: cookies are domain-scoped (not port-scoped), so a cookie set on `localhost` works across ports.

## Local via docker-compose (all services)

```bash
cp .env.example .env
docker compose up --build
```

Docs:

- `docs/architecture.md`
- `docs/auth-flow.md`
