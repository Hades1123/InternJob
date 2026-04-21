import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateSummaryDto {
  @IsString()
  id: string;

  @IsArray()
  @IsString({ each: true })
  allTechStacks: string[];

  @IsString()
  generalNotes: string;
}
