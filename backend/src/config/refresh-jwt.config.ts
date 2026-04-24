import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { StringValue } from 'ms';

export default registerAs(
  'refresh-jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_REFRESH_TOKEN_SECRET as string,
    signOptions: {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES as StringValue,
    },
  }),
);
