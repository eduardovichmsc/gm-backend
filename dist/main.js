"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = require("fs");
async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync('./secrets/privkey.pem'),
        cert: fs.readFileSync('./secrets/cert.pem'),
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions });
    app.enableCors({
        origin: true,
        credentials: true,
    });
    await app.listen(5000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map