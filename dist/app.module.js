"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const products_module_1 = require("./products/products.module");
const manufacturers_module_1 = require("./manufacturers/manufacturers.module");
const categories_module_1 = require("./categories/categories.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const country_module_1 = require("./country/country.module");
const hello_controller_1 = require("./hello/hello.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            users_module_1.UsersModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            jwt_1.JwtModule,
            products_module_1.ProductsModule,
            manufacturers_module_1.ManufacturersModule,
            categories_module_1.CategoriesModule,
            country_module_1.CountryModule,
        ],
        controllers: [hello_controller_1.HelloController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map