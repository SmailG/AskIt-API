"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const models_1 = require("./models");
exports.DevelopmentORMConfig = {
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: models_1.dbModels,
    extra: { options: { encrypt: true } },
    synchronize: true
};
exports.connection = typeorm_1.createConnection(exports.DevelopmentORMConfig);
//# sourceMappingURL=database.js.map