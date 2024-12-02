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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_service_1 = require("../auth/jwt/jwt.service");
let UsersService = class UsersService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(email, password) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: email },
            });
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = this.prisma.user.create({
                data: { email, password: hashedPassword },
                select: { id: true, email: true },
            });
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('Failed to register user', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = this.jwtService.generateToken(user.id, user.email);
            return {
                status: 200,
                message: 'Login successful',
                userId: user.id,
                token: token,
            };
        }
        throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
    }
    async getAllUsers() {
        try {
            return this.prisma.user.findMany({
                select: { id: true, email: true },
            });
        }
        catch (error) {
            throw new common_1.HttpException('Failed to fetch users', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getUserById(userId) {
        try {
            return this.prisma.user.findUnique({
                where: { id: +userId },
                select: { email: true, id: true, createdAt: true },
            });
        }
        catch (error) {
            throw new common_1.UnauthorizedException(common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_service_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map