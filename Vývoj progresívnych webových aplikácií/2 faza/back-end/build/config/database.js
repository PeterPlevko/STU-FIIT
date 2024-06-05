"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const databaseConfig = {
    connection: Env_1.default.get('DB_CONNECTION'),
    connections: {
        pg: {
            client: 'pg',
            connection: {
                host: Env_1.default.get('PG_HOST'),
                port: Env_1.default.get('PG_PORT'),
                user: Env_1.default.get('PG_USER'),
                password: Env_1.default.get('PG_PASSWORD', ''),
                database: Env_1.default.get('PG_DB_NAME'),
            },
            seeders: {
                paths: ['./database/seeders/MainSeeder'],
            },
            migrations: {
                naturalSort: true,
            },
            healthCheck: true,
            debug: false,
        },
    }
};
exports.default = databaseConfig;
//# sourceMappingURL=database.js.map