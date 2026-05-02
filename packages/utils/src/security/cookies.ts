export const cookieNames = {
  access: 'ld_access',
  refresh: 'ld_refresh',
} as const;

export type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  domain?: string;
  path: string;
};

export function getAuthCookieOptions(opts: {
  secure: boolean;
  domain?: string;
}): CookieOptions {
  return {
    httpOnly: true,
    secure: opts.secure,
    sameSite: 'lax',
    domain: opts.domain && opts.domain.length > 0 ? opts.domain : undefined,
    path: '/',
  };
}
