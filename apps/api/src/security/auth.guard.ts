import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';

export type AuthUser = {
  id: string;
  role: 'user' | 'admin';
  sessionId?: string;
};

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser;
  }
}

@Injectable()
export class HeaderAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const userId = (req as any).header?.('x-user-id') ?? (req as any).headers?.['x-user-id'];
    const role = (req as any).header?.('x-user-role') ?? (req as any).headers?.['x-user-role'];
    const sid = (req as any).header?.('x-session-id') ?? (req as any).headers?.['x-session-id'];

    if (!userId || (role !== 'user' && role !== 'admin')) {
      throw new UnauthorizedException('Not authenticated');
    }
    (req as any).user = { id: userId, role, sessionId: sid };
    return true;
  }
}
