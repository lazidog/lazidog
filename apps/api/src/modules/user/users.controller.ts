import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { getPrisma } from '@lazidog/db';
import { HeaderAuthGuard } from '../security/auth.guard';

@Controller('/v1')
export class UsersController {
  private readonly prisma = getPrisma();

  @Get('/me')
  @UseGuards(HeaderAuthGuard)
  async me(@Req() req: any) {
    const userId = req.user.id as string;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return {
      id: user?.id ?? userId,
      email: user?.email ?? null,
      role: user?.role ?? 'user',
    };
  }
}
