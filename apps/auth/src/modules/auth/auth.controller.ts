import { loginRedirectQuerySchema, oauthCallbackQuerySchema } from '@lazidog/shared';
import { Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { Profile } from 'passport-google-oauth20';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthService } from './auth.service';

@Controller('/v1')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get('/login/google')
  @UseGuards(GoogleAuthGuard)
  googleLogin(
    @Query('returnTo') returnToRaw: string | undefined,
    @Query('state') stateRaw?: string
  ) {
    loginRedirectQuerySchema.parse({ returnTo: returnToRaw ?? stateRaw });
  }

  @Get('/login/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(
    @Req() req: Request,
    @Query('state') stateRaw: string | undefined,
    @Res() res: Response
  ) {
    const { state: returnTo } = oauthCallbackQuerySchema.parse({ state: stateRaw });
    // passport-google-oauth20 attaches profile as req.user
    const profile = req.user as unknown as Profile;
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
