import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/auth/jwt/jwt.service';
import { Request } from 'express';
export declare class UsersService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    getAuthorizationHeader(req: Request): Promise<any>;
    register(email: string, password: string): Promise<{
        id: number;
        email: string;
    }>;
    login(email: string, password: string): Promise<{
        status: number;
        message: string;
        userId: number;
        token: string;
    }>;
    getAllUsers(): Promise<{
        id: number;
        email: string;
        role: string;
    }[]>;
    getUserById(id: number): Promise<{
        id: number;
        email: string;
    }>;
    getUserByEmail(email: string): Promise<{
        id: number;
        email: string;
        role: string;
    }>;
    setAdmin(email: string): Promise<{
        id: number;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
