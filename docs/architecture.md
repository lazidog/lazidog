# Architecture

This repo is a Turborepo + Yarn workspaces monorepo for a modular platform.

## Apps

- `apps/web`: Next.js App Router frontend.
- `apps/api`: NestJS backend API.
- `apps/auth`: NestJS Google OAuth and session service.
- `apps/worker`: BullMQ workers for email, notifications, and future async jobs.
- `apps/proxy`: Cloudflare Worker image proxy for R2 assets.

There is intentionally no gateway service. The API validates the shared auth cookie directly.

## Packages

- `packages/shared`: Zod contracts, shared types, constants, env validation, errors, cookie/JWT helpers, and Nest HTTP helpers.
- `packages/db`: Prisma schema/client helpers for PostgreSQL.

Frontend UI components live in `apps/web/src/components`.

## Local Ports

- Web: `3000`
- API: `4000`
- Auth: `4002`
- Worker: no HTTP port
- Proxy: `8788` via Wrangler
- PostgreSQL: `5432`
- Redis: `6379`

## Request Flow

The frontend calls `apps/api` and `apps/auth` directly with `withCredentials: true`.
Protected API routes read `ld_access` from an httpOnly cookie, verify the JWT, and attach claims to `req.user`.

If a request receives `401`, the web axios interceptor calls `POST /v1/refresh` once, then retries the original request once. If refresh fails, the web app clears local auth state.

## Events

Redis + BullMQ power the lightweight event system. Queues are intentionally simple:

- `email`
- `notification`
- `async`

Add queue handlers when a real async use case appears; avoid building a generalized event framework early.

## Edge Proxy

`apps/proxy` owns image proxying, R2 reads, caching, and optional resizing. It must not contain product business logic.
