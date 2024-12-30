import { UsersService } from './users.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Request, Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAuthorizationHeader(req: Request): Promise<any>;
    register(userRegisterDto: UserRegisterDto): Promise<{
        id: number;
        email: string;
    }>;
    login(userLoginDto: UserLoginDto, response: Response): Promise<{
        token: string;
        status: number;
        userId: number;
    }>;
    getAllUsers(): Promise<{
        id: number;
        email: string;
        role: string;
    }[]>;
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
