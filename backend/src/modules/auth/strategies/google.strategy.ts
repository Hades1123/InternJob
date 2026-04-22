import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import googleOauthConfig from '@/config/google-oauth.config';
import type { ConfigType } from '@nestjs/config';

export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private readonly googleConfiguration: ConfigType<typeof googleOauthConfig>,
  ) {
    super({
      clientID: googleConfiguration.clientId,
      clientSecret: googleConfiguration.clientSecret,
      callbackURL: googleConfiguration.callbackURL,
      scope: ['email', 'profile'],
    });
  }
  validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    console.log({ profile });
  }
}
