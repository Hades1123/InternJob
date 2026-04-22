import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth.guard';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleCallback() {}
}
