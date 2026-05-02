import { cookieNames } from "@lazidog/utils";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import type { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { AppConfigService } from "../shared/services/app-config.service";
import { TokenService } from "./token.service";

@Injectable()
export class ProxyService {
  constructor(
    private readonly config: AppConfigService,
    private readonly tokens: TokenService,
  ) {}

  proxyToAuth(req: Request, res: Response) {
    const mw = createProxyMiddleware({
      target: this.config.get("AUTH_BASE_URL"),
      changeOrigin: true,
      xfwd: true,
    });
    return mw(req, res, () => undefined);
  }

  proxyToApi(req: Request, res: Response) {
    const access = req.cookies?.[cookieNames.access];
    console.log(
      "Gateway received access token:",
      access ? "present" : "missing",
    );
    if (!access) throw new UnauthorizedException("Not authenticated");

    try {
      const claims = this.tokens.verifyAccessToken(access);
      console.log("Token verified, claims:", claims);

      const mw = createProxyMiddleware({
        target: this.config.get("API_BASE_URL"),
        changeOrigin: true,
        xfwd: true,
        pathRewrite: (path) => path.replace(/^\/v1\/api/, "/v1"),
        on: {
          proxyReq: (proxyReq) => {
            proxyReq.setHeader("x-user-id", claims.sub);
            proxyReq.setHeader("x-user-role", claims.role);
            proxyReq.setHeader("x-session-id", claims.sid);
            proxyReq.setHeader(
              "x-gateway-secret",
              this.config.get("GATEWAY_INTERNAL_SECRET"),
            );
          },
        },
      });

      return mw(req, res, () => undefined);
    } catch (error) {
      console.error("Proxy token verification failed:", error);
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}
