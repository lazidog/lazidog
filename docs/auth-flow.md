# Auth Flow

Authentication is Google OAuth only.

## Cookies

Session cookies are:

- Domain: `.lazidog.dev`
- httpOnly: `true`
- secure: `true`
- sameSite: `lax`

The access token is never stored in `localStorage`.

## Tokens

- Access token: short-lived JWT with `sub`, `role`, and `sid`.
- Refresh token: opaque random token stored only as a SHA-256 hash in PostgreSQL.
- Refresh tokens rotate on every refresh.
- The old refresh token is revoked before the new one is accepted.
- Reuse of a revoked refresh token revokes active tokens for that user.

## Login

1. Web redirects to `GET /v1/login/google?returnTo=/`.
2. Auth completes the Google callback.
3. Auth upserts `User` and `Account`.
4. Auth creates a refresh-token record and sets `ld_access` and `ld_refresh`.
5. Auth redirects back to the validated `returnTo`.

## Refresh

1. Client receives `401`.
2. Axios calls `POST /v1/refresh`.
3. Auth validates the refresh cookie, revokes the old DB record, creates a new refresh token, and sets new cookies.
4. Axios retries the original request once.
5. If refresh fails, the client clears auth state and stops retrying.

## API Authorization

The API validates the `ld_access` cookie directly using the shared JWT configuration. RBAC guards read `req.user.role`.
