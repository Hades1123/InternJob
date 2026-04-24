import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { googleOAuthConfig } from '@/config';
import type { ConfigType } from '@nestjs/config';
import { AuthService } from '@/modules/auth/auth.service';

export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOAuthConfig.KEY)
    private readonly googleConfiguration: ConfigType<typeof googleOAuthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: googleConfiguration.clientId,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,
      scope: ['email', 'profile'],
    });
  }
  async validate(_accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback) {
    const user = await this.authService.validateGoogleUser({
      googleId: profile.id,
      name: profile.displayName,
      avatarURL: profile?.photos[0]?.value ?? '',
      email: profile.emails[0].value,
    });
    done(null, user);
  }
}
