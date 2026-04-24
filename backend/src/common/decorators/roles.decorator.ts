import { UserRole } from '@/shared/constants/constant';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEYS = Symbol('ROLE_KEYS');
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLE_KEYS, roles);
