import { AuthJwtPayload } from '@/modules/auth/types/auth.jwt.type';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: AuthJwtPayload;
}
