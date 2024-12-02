"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createProductDto) {
        try {
            const newProduct = await this.prisma.product.create({
                data: {
                    name: createProductDto.name,
                    description: createProductDto.description,
                    price: +createProductDto.price,
                    categoryId: +createProductDto.categoryId,
                    subCategoryId: +createProductDto.subCategoryId,
                    manufacturerId: +createProductDto.manufacturerId,
                    countryId: +createProductDto.countryId,
                    image: createProductDto.image,
                },
            });
            return newProduct;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Product creation failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async find(page = 1, limit = 6, manufacturerId, categoryId, search) {
        try {
            const skip = (page - 1) * limit;
            const where = {};
            if (manufacturerId)
                where.manufacturerId = manufacturerId;
            if (categoryId)
                where.categoryId = categoryId;
            if (search) {
                where.OR = [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ];
            }
            const [products, total] = await this.prisma.$transaction([
                this.prisma.product.findMany({
                    where,
                    skip,
                    take: limit,
                }),
                this.prisma.product.count({ where }),
            ]);
            return {
                limit,
                total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                list: products,
            };
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException("Couldn't FILTER products", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findOneById(id) {
        try {
            if (!id) {
                throw new common_1.HttpException('ID is required', common_1.HttpStatus.BAD_REQUEST);
            }
            const product = await this.prisma.product.findUnique({
                where: { id: +id },
            });
            if (!product) {
                throw new common_1.HttpException(`Product with ID ${id} not found`, common_1.HttpStatus.NOT_FOUND);
            }
            return product;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException("Couldn't FIND_PRODUCT by id " + id, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, updateProductDto) {
        try {
            const updatedProduct = await this.prisma.product.update({
                where: {
                    id: +id,
                },
                data: {
                    ...updateProductDto,
                    price: updateProductDto.price ? +updateProductDto.price : undefined,
                    categoryId: updateProductDto.categoryId
                        ? +updateProductDto.categoryId
                        : undefined,
                    manufacturerId: updateProductDto.manufacturerId
                        ? +updateProductDto.manufacturerId
                        : undefined,
                    countryId: updateProductDto.countryId
                        ? +updateProductDto.countryId
                        : undefined,
                },
            });
            return updatedProduct;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException("Couldn't UPDATE product by id " + id, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        try {
            const removedProduct = await this.prisma.product.delete({
                where: { id: +id },
            });
            return removedProduct;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException("Couldn't REMOVE product by id " + id, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map