import { ConnectionOptions, createConnection } from "typeorm";
import { dbModels } from "./models";

export const DevelopmentORMConfig: ConnectionOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: dbModels,
    extra: { options: { encrypt: true } },
    synchronize: true
};

export const connection = createConnection(DevelopmentORMConfig);
