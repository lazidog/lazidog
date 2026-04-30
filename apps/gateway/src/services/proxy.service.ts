import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { getRuntimeEnv } from '@lazidog/config';
import { cookieNames } from '@lazidog/utils';
import { TokenService } from './token.service';

@Injectable()
export class ProxyService {
  private readonly env = getRuntimeEnv();

  constructor(private readonly tokens: TokenService) {}

  proxyToAuth(req: Request, res: Response) {
    const mw = createProxyMiddleware({
      target: this.env.AUTH_BASE_URL,
      changeOrigin: true,
      xfwd: true,
    });
    return mw(req, res, () => undefined);
  }

  proxyToApi(req: Request, res: Response) {
    const access = req.cookies?.[cookieNames.access];
    if (!access) throw new UnauthorizedException('Not authenticated');

    const claims = this.tokens.verifyAccessToken(access);

    const mw = createProxyMiddleware({
      target: this.env.API_BASE_URL,
      changeOrigin: true,
      xfwd: true,
      pathRewrite: (path) => path.replace(/^\\/v1\\/api/, '/v1'),
      on: {
        proxyReq: (proxyReq) => {
          proxyReq.setHeader('x-user-id', claims.sub);
          proxyReq.setHeader('x-user-role', claims.role);
          proxyReq.setHeader('x-session-id', claims.sid);
          proxyReq.setHeader('x-gateway-secret', this.env.GATEWAY_INTERNAL_SECRET);
        },
      },
    });

    return mw(req, res, () => undefined);
  }
}

