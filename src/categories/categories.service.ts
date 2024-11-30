import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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
      throw new HttpException('Creating failed', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return this.prisma.category.findMany();
  }

  async findById(id: number) {
    try {
      const category = this.prisma.category.findUnique({ where: { id: +id } });
      return category;
    } catch (error) {
      console.error(error);
      throw new HttpException("Couldn't FIND category by id ", id);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const updatedCategory = await this.prisma.category.update({
        where: {
          id: +id,
        },
        data: {
          ...updateCategoryDto,
        },
      });
      return updatedCategory;
    } catch (error) {
      console.error(error);
      throw new HttpException('Updating failed', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      return this.prisma.category.delete({
        where: {
          id: +id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException('Removing failed', HttpStatus.BAD_REQUEST);
    }
  }
}
