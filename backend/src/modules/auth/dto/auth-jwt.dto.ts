import { UserRole } from '@/common/constants';

export type AuthJwtPayload = {
  googleId: string;
  role: UserRole;
};

export type TokensResponse = {
  accessToken: string;
  refreshToken: string;
};
