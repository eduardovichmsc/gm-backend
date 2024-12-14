import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCountryDto } from './dto/update-country.dto';
export declare class CountryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(name: string): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findById(id: number): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, updatedCountyDto: UpdateCountryDto): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
