import { AUTH_COOKIE_NAMES, COOKIE_DOMAIN } from '../constants/auth';

export const cookieNames = AUTH_COOKIE_NAMES;

export type CookieOptions = {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  domain: string;
  path: string;
};

export function getAuthCookieOptions(domain = COOKIE_DOMAIN): CookieOptions {
  return {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    domain,
    path: '/',
  };
}
