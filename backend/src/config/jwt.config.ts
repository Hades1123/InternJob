import { registerAs } from '@nestjs/config';
import { StringValue } from 'ms';

export const accessJwtConfig = registerAs('access-jwt', () => ({
  secret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
  signOptions: {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES as StringValue,
  },
}));

export const refreshJwtConfig = registerAs('refresh-jwt', () => ({
  secret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
  signOptions: {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES as StringValue,
  },
}));