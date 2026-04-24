import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { type AuthRequest } from '@/common/types/auth-req.interface';
import { APIResponse } from '@/common/types/global';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUserProfile(@Req() req: AuthRequest): Promise<APIResponse<User>> {
    const { googleId } = req.user!;
    const user = await this.userService.findUserById(googleId);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return {
      success: true,
      data: user,
    };
  }
}
