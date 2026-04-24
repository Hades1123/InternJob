import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { StringValue } from 'ms';

export default registerAs(
  'access-jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    signOptions: {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES as StringValue,
    },
  }),
);
