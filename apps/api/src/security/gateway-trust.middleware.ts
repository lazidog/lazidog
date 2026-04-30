import type { NextFunction, Request, Response } from 'express';

export function GatewayTrustMiddleware(secret: string) {
  return function gatewayTrust(req: Request, res: Response, next: NextFunction) {
    // Public endpoints are still reachable directly.
    if (req.path === '/v1/health') return next();

    const hdr = req.header('x-gateway-secret');
    if (!hdr || hdr !== secret) {
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
  };
}

