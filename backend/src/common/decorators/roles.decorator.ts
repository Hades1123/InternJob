import { UserRole } from '@/common/constants';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEYS = Symbol('ROLE_KEYS');
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLE_KEYS, roles);
