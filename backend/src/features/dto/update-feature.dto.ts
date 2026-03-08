import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateFeatureDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @IsString()
  @MaxLength(255)
  creatorIdentifier: string;
}
