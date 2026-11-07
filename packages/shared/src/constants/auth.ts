export const AUTH_COOKIE_NAMES = {
  access: 'ld_access',
  refresh: 'ld_refresh',
} as const;

export const AUTH_JWT = {
  audience: 'lazidog',
  issuer: 'auth',
} as const;

export const COOKIE_DOMAIN = '.lazidog.dev';
export const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
export const REFRESH_TOKEN_TTL_DAYS = 30;
