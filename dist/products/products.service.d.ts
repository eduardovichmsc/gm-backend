import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProductDto: CreateProductDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        priceTo: number;
        categoryId: number;
        subCategoryId: number | null;
        manufacturerId: number;
        countryId: number;
        image: string | null;
    }>;
    find(page?: number, limit?: number, manufacturerId?: number, categoryId?: number, search?: string): Promise<{
        limit: number;
        total: number;
        currentPage: number;
        totalPages: number;
        list: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string;
            price: number;
            priceTo: number;
            categoryId: number;
            subCategoryId: number | null;
            manufacturerId: number;
            countryId: number;
            image: string | null;
        }[];
    }>;
    findOneById(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        priceTo: number;
        categoryId: number;
        subCategoryId: number | null;
        manufacturerId: number;
        countryId: number;
        image: string | null;
    }>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        priceTo: number;
        categoryId: number;
        subCategoryId: number | null;
        manufacturerId: number;
        countryId: number;
        image: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        priceTo: number;
        categoryId: number;
        subCategoryId: number | null;
        manufacturerId: number;
        countryId: number;
        image: string | null;
    }>;
}
