import { IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
  @IsOptional()
  @IsString()
  name: string;
}
