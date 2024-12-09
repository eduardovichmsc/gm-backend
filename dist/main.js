"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieParser = require("cookie-parser");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: process.env.ORIGIN, credentials: true });
    app.use(cookieParser());
    console.log(process.env.DATABASE_URL);
    console.log(process.env.ORIGIN);
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map