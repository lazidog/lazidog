import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { REQUEST_ID_HEADER } from './request-id.middleware';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const requestId =
      // @ts-expect-error - set by middleware
      (req.requestId as string | undefined) ?? req.header(REQUEST_ID_HEADER) ?? undefined;

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      const message =
        typeof response === 'string'
          ? response
          : typeof (response as any)?.message === 'string'
            ? (response as any).message
            : exception.message;

      res.status(status).json({
        success: false as const,
        error: {
          code: `HTTP_${status}`,
          message,
          details: typeof response === 'object' ? response : undefined,
          requestId,
        },
      });
      return;
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false as const,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Unexpected error',
        requestId,
      },
    });
  }
}

