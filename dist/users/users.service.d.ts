import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/auth/jwt/jwt.service';
export declare class UsersService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
    }[]>;
    getUserById(userId: number): Promise<{
        id: number;
        email: string;
    }>;
}
