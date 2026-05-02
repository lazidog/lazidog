import pinoHttp from 'pino-http';
import type { RequestHandler } from 'express';
import { REQUEST_ID_HEADER } from '../nest/request-id.middleware';

export function createPinoHttp(): RequestHandler {
  return pinoHttp({
    transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
    customProps: (req) => ({
      requestId:
        // @ts-expect-error - set by requestIdMiddleware
        (req.requestId as string | undefined) ?? req.headers[REQUEST_ID_HEADER],
    }),
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
          remoteAddress: req.remoteAddress,
          remotePort: req.remotePort,
        };
      },
      res(res) {
        return { statusCode: res.statusCode };
      },
    },
  }) as unknown as RequestHandler;
}
