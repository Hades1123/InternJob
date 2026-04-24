import { registerAs } from '@nestjs/config';

export const googleOAuthConfig = registerAs('googleOAuth', () => ({
  clientId: process.env.GOOGLE_AUTH_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET as string,
  callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL as string,
}));