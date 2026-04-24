import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '@/common/constants';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const countUsers = await this.userModel.countDocuments();
    const existUser = await this.userModel.findOne({
      googleId: dto.googleId,
    });
    if (!existUser) {
      return await this.userModel.create({
        ...dto,
        role: countUsers ? UserRole.USER : UserRole.ADMIN,
      });
    }
    return existUser;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  async findUserById(googleUserId: string) {
    return await this.userModel.findOne({ googleId: googleUserId }).select({ hashedRefreshToken: 0 });
  }

  async updateRefreshToken(googleId: string, refreshToken: string) {
    await this.userModel.updateOne(
      {
        googleId,
      },
      {
        $set: {
          hashedRefreshToken: refreshToken,
        },
      },
    );
  }
}
