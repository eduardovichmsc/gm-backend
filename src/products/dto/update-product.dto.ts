// src/products/dto/update-product.dto.ts
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  priceTo?: number;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @IsNumber()
  subCategoryId?: number;

  @IsOptional()
  @IsNumber()
  manufacturerId?: number;

  @IsOptional()
  @IsNumber()
  countryId: number;

  @IsOptional()
  @IsString()
  image?: string;
}
