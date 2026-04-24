import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  googleId: string;

  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  avatarURL: string;
}
