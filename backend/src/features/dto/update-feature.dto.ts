import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateFeatureDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  creatorIdentifier: string;
}