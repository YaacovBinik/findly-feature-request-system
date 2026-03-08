import { IsNotEmpty, IsString } from 'class-validator';

export class VoteFeatureDto {
  @IsString()
  @IsNotEmpty()
  userIdentifier: string;
}