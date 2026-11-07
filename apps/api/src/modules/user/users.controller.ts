import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { getPrisma } from '@lazidog/db';
import { meResponseSchema } from '@lazidog/shared';
import type { Request } from 'express';
import { HeaderAuthGuard } from '../security/auth.guard';

@Controller('/v1')
export class UsersController {
  private readonly prisma = getPrisma();

  @Get('/me')
  @UseGuards(HeaderAuthGuard)
  async me(@Req() req: Request) {
    const userId = req.user?.sub;
    if (!userId) throw new UnauthorizedException('Not authenticated');
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    return meResponseSchema.parse({
      id: user.id,
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
      role: user.role,
    });
  }
}
