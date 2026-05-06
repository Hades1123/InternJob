import { Transform, Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export enum QuantityFilter {
  FULL = 'full',
  INSUFFICIENT = 'insufficient',
}

export class SearchCompanyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  techStacks?: string;

  @Transform(({ value }) => (value ? String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : value))
  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsEnum(['any', 'all'])
  techMode?: 'any' | 'all' = 'any';

  @IsOptional()
  @IsEnum(['updatedAt', 'createdAt'])
  sortBy?: 'updatedAt' | 'createdAt' = 'createdAt';

  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;

  @IsOptional()
  @IsEnum(['true', 'false'])
  checked: string;

  @IsOptional()
  @IsEnum(['true', 'false'])
  liked: string;

  @IsOptional()
  @IsEnum(QuantityFilter)
  quantity?: QuantityFilter;
}
