import { AuthJwtPayload } from '@/modules/auth/dto/auth-jwt.dto';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: AuthJwtPayload;
}