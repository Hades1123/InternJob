import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UserService } from '@/modules/user/user.service';
import { AuthJwtPayload, TokensResponse } from './dto/auth-jwt.dto';
import { HashUtil } from '@/utils';
import { JwtService } from '@nestjs/jwt';
import { accessJwtConfig, refreshJwtConfig } from '@/config';
import { type ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(accessJwtConfig.KEY)
    private readonly accessConfig: ConfigType<typeof accessJwtConfig>,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async login(payload: AuthJwtPayload): Promise<TokensResponse> {
    const { accessToken, refreshToken } = await this.generateTokens(payload);
    const hashedRefreshToken = await HashUtil.hash(refreshToken);
    await this.userService.updateRefreshToken(payload.googleId, hashedRefreshToken);
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateGoogleUser(googleUser: CreateUserDto) {
    const user = await this.userService.findUserByEmail(googleUser.email);
    if (!user) {
      const newUser = await this.userService.createUser(googleUser);
      return newUser;
    }
    return user;
  }

  async validateJwtUser(googleUserId: string): Promise<AuthJwtPayload> {
    const user = await this.userService.findUserById(googleUserId);
    if (!user) throw new UnauthorizedException('User not found');
    return {
      googleId: user.googleId,
      role: user.role,
    };
  }

  async generateTokens(payload: AuthJwtPayload): Promise<TokensResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: this.accessConfig.signOptions?.expiresIn,
        secret: this.accessConfig.secret as string,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.refreshConfig.secret as string,
        expiresIn: this.refreshConfig.signOptions?.expiresIn,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
