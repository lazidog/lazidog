import { All, Controller, Get, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import { ProxyService } from "./proxy.service";

@Controller("/v1")
export class GatewayController {
  constructor(private readonly proxy: ProxyService) {}

  @Get("/health")
  health() {
    return { ok: true };
  }

  @All(["/session", "/refresh", "/logout"])
  authPassThrough(@Req() req: Request, @Res() res: Response) {
    return this.proxy.proxyToAuth(req, res);
  }

  @All("/api/*")
  api(@Req() req: Request, @Res() res: Response) {
    return this.proxy.proxyToApi(req, res);
  }
}
