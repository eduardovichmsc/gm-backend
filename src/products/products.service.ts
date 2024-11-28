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
          price: +createProductDto.price,
          categoryId: +createProductDto.categoryId,
          subCategoryId: +createProductDto.subCategoryId,
          manufacturerId: +createProductDto.manufacturerId,
          image: createProductDto.image,
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

  async findAll(page: number = 1, limit: number = 6) {
    try {
      const skip = (page - 1) * limit;
      const [products, total] = await this.prisma.$transaction([
        this.prisma.product.findMany({
          skip: skip,
          take: limit,
        }),
        this.prisma.product.count(),
      ]);
      return {
        list: products,
        limit,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
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
      if (!id) {
        throw new HttpException('ID is required', HttpStatus.BAD_REQUEST);
      }

      const product = await this.prisma.product.findUnique({
        where: { id: +id },
      });

      console.log(product);

      if (!product) {
        throw new HttpException(
          `Product with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

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
        where: { id: +id },
        data: {
          ...updateProductDto,
          price: +updateProductDto.price,
          categoryId: +updateProductDto.categoryId,
          manufacturerId: +updateProductDto.manufacturerId,
        },
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

  async findWithFilters(
    page: number = 1,
    limit: number = 6,
    manufacturerId?: number,
    categoryId?: number,
  ) {
    try {
      const skip = (page - 1) * limit;

      const where: any = {};
      if (manufacturerId) where.manufacturerId = manufacturerId;
      if (categoryId) where.categoryId = categoryId;

      const [products, total] = await this.prisma.$transaction([
        this.prisma.product.findMany({
          where,
          skip,
          take: limit,
        }),
        this.prisma.product.count({ where }),
      ]);

      return {
        list: products,
        limit,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        "Couldn't FILTER products",
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
