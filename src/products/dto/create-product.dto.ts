import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  priceTo: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsNumber()
  subCategoryId?: number;

  @IsNotEmpty()
  @IsNumber()
  manufacturerId: number;

  @IsNotEmpty()
  @IsNumber()
  countryId: number;

  @IsOptional()
  @IsString()
  image?: string;
}
