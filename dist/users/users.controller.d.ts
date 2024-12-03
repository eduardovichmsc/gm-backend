import { UsersService } from './users.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    }[]>;
    getUserById(id: number): Promise<{
        id: number;
        email: string;
    }>;
}