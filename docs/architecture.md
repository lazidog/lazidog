# Architecture

This repo is a Turborepo + Yarn workspaces monorepo.

- `apps/web`: Next.js frontend gateway (lazidog.dev)
- `apps/api`: Backend API (api.lazidog.dev)
- `apps/auth`: Auth service (auth.lazidog.dev)
- `apps/gateway`: API gateway (gateway.lazidog.dev)
- `apps/proxy`: Cloudflare Worker image proxy (proxy.lazidog.dev)
- `packages/*`: shared libraries (schemas, Prisma, UI, utils, config, api-client)

See `docs/auth-flow.md` for SSO and cookie strategy.

## Local ports

- `apps/web`: 3000
- `apps/api`: 4000
- `apps/gateway`: 4001
- `apps/auth`: 4002
- `apps/proxy`: 8787 (wrangler dev)

## Gateway trust

The API expects requests to go through the gateway. The gateway injects `x-gateway-secret`,
and the API checks it against `GATEWAY_INTERNAL_SECRET`.
