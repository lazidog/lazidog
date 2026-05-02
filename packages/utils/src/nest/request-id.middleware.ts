import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'node:crypto';

export const REQUEST_ID_HEADER = 'x-request-id';

export function requestIdMiddleware(req: Request, res: Response, next: NextFunction) {
  const existing = req.header(REQUEST_ID_HEADER);
  const requestId = existing && existing.length > 0 ? existing : randomUUID();
  res.setHeader(REQUEST_ID_HEADER, requestId);
  // @ts-expect-error - attach to request for convenience in filters/interceptors
  req.requestId = requestId;
  next();
}
