# Auth Flow (SSO)

Goal: SSO across subdomains via shared cookies.

## Cookies

- Domain: `.lazidog.dev` (prod)
- httpOnly: `true`
- secure: `true`
- sameSite: `lax`

In local dev, browsers generally don't allow `Domain=localhost`. This scaffold defaults to host-only cookies
unless `COOKIE_DOMAIN` is explicitly set.

## Tokens

- Access token: short-lived JWT (signed, includes `sub`, `role`, `sid`)
- Refresh token: opaque token stored in DB (revocable + rotatable)

## Login

1. `web` redirects to `auth` login route (Google or dev/mock).
2. `auth` completes OAuth callback, creates/updates user & account, issues refresh token record.
3. `auth` sets cookies and redirects back to the original return URL.

## API / Gateway

Gateway validates access JWT and injects user context headers to the API.
API performs RBAC checks (role-based guard) and validates input using shared Zod schemas.
