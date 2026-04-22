import { type TRole } from '@/shared/constants/constant';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  googleId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  avatarURL: string;

  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role: TRole;

  @Prop()
  hashedRefreshToken: string;

  @Prop({ type: [String], default: [] })
  checkedCompanies: string[];

  @Prop({ type: [String], default: [] })
  likedCompanies: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
