import { Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { loginRedirectQuerySchema } from '@lazidog/shared';
import { AuthService } from '../services/auth.service';
import { GoogleAuthGuard } from '../guards/google-auth.guard';

@Controller('/v1')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('/login/dev')
  async devLogin(
    @Query('returnTo') returnToRaw: string | undefined,
    @Query('email') emailRaw: string | undefined,
    @Res() res: Response,
  ) {
    const { returnTo } = loginRedirectQuerySchema.parse({ returnTo: returnToRaw });
    const email = emailRaw?.trim() || 'dev@lazidog.dev';
    await this.auth.issueSessionAndRedirect({ res, returnTo, provider: 'dev', email });
  }

  @Get('/login/mezon')
  async mezonMock(
    @Query('returnTo') returnToRaw: string | undefined,
    @Query('email') emailRaw: string | undefined,
    @Res() res: Response,
  ) {
    const { returnTo } = loginRedirectQuerySchema.parse({ returnTo: returnToRaw });
    const email = emailRaw?.trim() || 'mezon.user@lazidog.dev';
    await this.auth.issueSessionAndRedirect({
      res,
      returnTo,
      provider: 'mezon',
      email,
      name: 'Mezon User',
    });
  }

  @Get('/login/google')
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleLogin() {}

  @Get('/login/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(
    @Req() req: Request,
    @Query('state') stateRaw: string | undefined,
    @Res() res: Response,
  ) {
    const returnTo = typeof stateRaw === 'string' && stateRaw.length ? stateRaw : '/';
    // passport-google-oauth20 attaches profile as req.user
    const profile = req.user as any;
    await this.auth.issueSessionAndRedirect({
      res,
      returnTo,
      provider: 'google',
      email: profile?.emails?.[0]?.value,
      name: profile?.displayName,
      imageUrl: profile?.photos?.[0]?.value,
      providerAccountId: profile?.id,
    });
  }

  @Get('/session')
  async session(@Req() req: Request) {
    return this.auth.getSession(req);
  }

  @Post('/refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.auth.refresh(req, res);
  }

  @Post('/logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.auth.logout(req, res);
  }
}
