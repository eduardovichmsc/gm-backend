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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCategoryDto) {
        try {
            const newCategory = await this.prisma.category.create({
                data: { name: createCategoryDto.name, tag: createCategoryDto.tag },
            });
            return newCategory;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Creating failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        return this.prisma.category.findMany();
    }
    async findById(id) {
        try {
            const category = this.prisma.category.findUnique({ where: { id: +id } });
            return category;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException("Couldn't FIND category by id ", id);
        }
    }
    async update(id, updateCategoryDto) {
        try {
            const updatedCategory = await this.prisma.category.update({
                where: {
                    id: +id,
                },
                data: {
                    ...updateCategoryDto,
                },
            });
            if (!updateCategoryDto) {
                throw new common_1.HttpException('Not found category', common_1.HttpStatus.BAD_REQUEST);
            }
            return updatedCategory;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Updating failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        try {
            return this.prisma.category.delete({
                where: {
                    id: +id,
                },
            });
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Removing failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map