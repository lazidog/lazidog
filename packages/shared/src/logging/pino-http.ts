import type { RequestHandler } from 'express';
import pinoHttp from 'pino-http';
import { REQUEST_ID_HEADER } from '../nest/request-id.middleware';

export function createPinoHttp(): RequestHandler {
  return pinoHttp({
    customProps: (req) => ({
      requestId: (req as { requestId?: string }).requestId ?? req.headers[REQUEST_ID_HEADER],
    }),
    redact: {
      paths: ['req.headers.cookie', 'req.headers.authorization'],
      remove: true,
    },
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
