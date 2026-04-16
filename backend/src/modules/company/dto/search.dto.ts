import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

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

  @IsOptional()
  @IsEnum(['any', 'all'])
  techMode?: 'any' | 'all' = 'any';

  @IsOptional()
  @IsEnum(['updatedAt', 'createdAt'])
  sortBy?: 'updatedAt' | 'createdAt' = 'updatedAt';

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
}
