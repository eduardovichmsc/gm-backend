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
exports.ManufacturersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ManufacturersService = class ManufacturersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(name) {
        try {
            const newManufacturer = await this.prisma.manufacturer.create({
                data: { name },
            });
            return newManufacturer;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Manufacturer creation failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        try {
            const manufacturers = await this.prisma.manufacturer.findMany();
            return manufacturers;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException("Couldn't FIND_ANY manufacturers", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findById(id) {
        try {
            const manufacturer = await this.prisma.manufacturer.findUnique({
                where: {
                    id: +id,
                },
            });
            return manufacturer;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException("Coudln't FIND manufacturer by id ", id);
        }
    }
    async remove(id) {
        try {
            const removedManufacturer = await this.prisma.manufacturer.delete({
                where: {
                    id: +id,
                },
            });
            return removedManufacturer;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException("Couldn't REMOVE manufacturer by id ", id);
        }
    }
};
exports.ManufacturersService = ManufacturersService;
exports.ManufacturersService = ManufacturersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ManufacturersService);
//# sourceMappingURL=manufacturers.service.js.map