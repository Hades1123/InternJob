import { UserRole } from '@/shared/constants/constant';

export type AuthJwtPayload = {
  googleId: string;
  role: UserRole;
};

export type TokensResponse = {
  accessToken: string;
  refreshToken: string;
};
