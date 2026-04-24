import { Controller, Get, Inject, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthService } from './auth.service';
import { type AuthRequest } from './interfaces';
import { type Response } from 'express';
import { envConfig } from '@/config';
import { type ConfigType } from '@nestjs/config';
import { IsPublic } from '@/common/decorators/IsPublic.decorator';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(envConfig.KEY)
    private readonly config: ConfigType<typeof envConfig>,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: AuthRequest, @Res() res: Response) {
    if (!req.user) {
      throw new UnauthorizedException('Not found user');
    }
    const { accessToken, refreshToken } = await this.authService.login({
      googleId: req.user.googleId,
      role: req.user.role,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, // production thì chỉnh lại true
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false, // true when production
      sameSite: 'strict',
      maxAge: 604800000, // 7 days
    });

    res.redirect(`${this.config.frontendUrl}`);
  }
}
