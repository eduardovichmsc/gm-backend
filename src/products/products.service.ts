import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const newProduct = await this.prisma.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          price: createProductDto.price,
          categoryId: createProductDto.categoryId,
          subCategoryId: createProductDto.subCategoryId,
          manufacturerId: createProductDto.manufacturerId,
        },
      });
      return newProduct;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Product creation failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    try {
      const products = await this.prisma.product.findMany();
      return products;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        "Couldn't FIND_ANY products",
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOneById(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id: id,
        },
      });
      return product;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        "Couldn't FIND_PRODUCT by id " + id,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id },
        data: { ...updateProductDto },
      });
      return updatedProduct;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        "Couldn't UPDATE product by id " + id,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const removedProduct = await this.prisma.product.delete({
        where: { id },
      });
      return removedProduct;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        "Couldn't REMOVE product by id " + id,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
