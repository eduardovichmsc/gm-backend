import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Role } from 'src/auth/role.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Role('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createProductDto.image = file?.filename;
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findWithFilters(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('manufacturerId') manufacturerId?: number,
    @Query('categoryId') categoryId?: number,
    @Query('search') search?: string,
  ) {
    return this.productsService.find(
      +page || 1,
      +limit || 9,
      manufacturerId ? +manufacturerId : undefined,
      categoryId ? +categoryId : undefined,
      search || undefined,
    );
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.productsService.findOneById(+id);
  }

  // @Role('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateProductDto.image = file.filename;
    }
    return this.productsService.update(id, updateProductDto);
  }

  // @Role('admin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
