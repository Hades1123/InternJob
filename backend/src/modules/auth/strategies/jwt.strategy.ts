import accessJwtConfig from '@/config/access-jwt.config';
import { Inject } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthJwtPayload } from '@/modules/auth/types/auth.jwt.type';
import { AuthService } from '@/modules/auth/auth.service';
import { Request } from 'express';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(accessJwtConfig.KEY)
    config: ConfigType<typeof accessJwtConfig>,
    private authService: AuthService,
  ) {
    const cookieExtractor = (req: Request) => {
      return req.cookies?.accessToken || null;
    };
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey: config.secret as string,
      ignoreExpiration: false,
    });
  }

  async validate(payload: AuthJwtPayload) {
    return await this.authService.validateJwtUser(payload.googleId);
  }
}
