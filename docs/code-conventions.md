# Code Conventions

## Contracts

Define request and response schemas in `packages/shared` with Zod. Client and server code should import the same schema and infer types from it.

## Auth

Never store access tokens in `localStorage`. Use httpOnly cookies and local in-memory state for UI status.

All refresh retry logic must retry the original request once at most.

## API

Validate request input at the controller boundary. Return data that can be parsed by shared response schemas.

## Frontend

Keep reusable frontend components in `apps/web/src/components`. Keep API calls in `apps/web/src/lib/api` and state atoms in `apps/web/src/lib/state`.

Use Jotai for small global state and React Query for server state.
