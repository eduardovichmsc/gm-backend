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
exports.CountryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CountryService = class CountryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(name) {
        try {
            console.log(name);
            const newCountry = await this.prisma.country.create({
                data: { name },
            });
            return newCountry;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Country creation failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll() {
        try {
            const countries = await this.prisma.country.findMany();
            return countries;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException("Couldn't FIND_ANY country", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findById(id) {
        try {
            const country = await this.prisma.country.findUnique({
                where: { id: +id },
            });
            if (!country) {
                throw new common_1.HttpException("Couldn't FIND country", common_1.HttpStatus.BAD_REQUEST);
            }
            return country;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException("Couldn't FIND country", common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, updatedCountyDto) {
        try {
            const updatedCountry = await this.prisma.country.update({
                where: {
                    id: +id,
                },
                data: {
                    ...updatedCountyDto,
                },
            });
            return updatedCountry;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('Updating failed', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        try {
            const removedCountry = await this.prisma.country.delete({
                where: { id: +id },
            });
            return removedCountry;
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException("Couldn't REMOVE country by id ", id);
        }
    }
};
exports.CountryService = CountryService;
exports.CountryService = CountryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CountryService);
//# sourceMappingURL=country.service.js.map