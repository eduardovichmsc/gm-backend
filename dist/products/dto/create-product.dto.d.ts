export declare class CreateProductDto {
    name: string;
    description: string;
    price: number;
    priceTo: number;
    categoryId: number;
    subCategoryId?: number;
    manufacturerId: number;
    countryId: number;
    image?: string;
}
