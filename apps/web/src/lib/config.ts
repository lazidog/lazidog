export const appConfig = {
  webBaseUrl: process.env.NEXT_PUBLIC_WEB_BASE_URL ?? 'http://localhost:3000',
  authBaseUrl: process.env.NEXT_PUBLIC_AUTH_BASE_URL ?? 'http://localhost:4002',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
} as const;

export const authRoutes = {
  googleLogin: `${appConfig.authBaseUrl}/v1/login/google?returnTo=/`,
} as const;
