import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.prisma.category.create({
        data: { name: createCategoryDto.name, tag: createCategoryDto.tag },
      });
      return newCategory;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Category creating failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    return this.prisma.category.findMany();
  }
}
