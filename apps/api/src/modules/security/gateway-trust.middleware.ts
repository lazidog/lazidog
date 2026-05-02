import type { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class GatewayTrustMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    // Public endpoints are still reachable directly.
    if (req.path === '/v1/health') {
      next();
      return;
    }

    const hdr = req.header('x-gateway-secret');
    if (!hdr || hdr !== process.env.GATEWAY_INTERNAL_SECRET) {
      res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Requests must go through the gateway',
        },
      });
      return;
    }
    next();
  }
}
