import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, file: Express.Multer.File): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        categoryId: number;
        subCategoryId: number | null;
        manufacturerId: number;
        countryId: number;
        image: string | null;
    }>;
    findWithFilters(page: number, limit: number, manufacturerId?: number, categoryId?: number, search?: string): Promise<{
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
        categoryId: number;
        subCategoryId: number | null;
        manufacturerId: number;
        countryId: number;
        image: string | null;
    }>;
    update(id: number, updateProductDto: UpdateProductDto, file: Express.Multer.File): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
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
        categoryId: number;
        subCategoryId: number | null;
        manufacturerId: number;
        countryId: number;
        image: string | null;
    }>;
}
