import { Controller, Get, Inject, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { AuthService } from './auth.service';
import { type AuthRequest } from './interfaces';
import { type Response } from 'express';
import { envConfig, accessJwtConfig, refreshJwtConfig } from '@/config';
import { type ConfigType } from '@nestjs/config';
import { IsPublic } from '@/common/decorators/IsPublic.decorator';
import ms from 'ms';

@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(envConfig.KEY)
    private readonly envConfigService: ConfigType<typeof envConfig>,
    @Inject(accessJwtConfig.KEY)
    private readonly accessJwtConfigService: ConfigType<typeof accessJwtConfig>,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshJwtConfigService: ConfigType<typeof refreshJwtConfig>,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: AuthRequest, @Res() res: Response) {
    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }
    const { accessToken, refreshToken } = await this.authService.login({
      googleId: req.user.googleId,
      role: req.user.role,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false, // true when production <https>
      sameSite: 'strict',
      maxAge: ms(this.accessJwtConfigService.signOptions.expiresIn) as number,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: ms(this.refreshJwtConfigService.signOptions.expiresIn) as number,
    });

    res.redirect(`${this.envConfigService.frontendUrl}`);
  }
}
