export declare class CreateProductDto {
    name: string;
    description: string;
    price: number;
    categoryId: number;
    subCategoryId?: number;
    manufacturerId: number;
    countryId: number;
    image?: string;
}
