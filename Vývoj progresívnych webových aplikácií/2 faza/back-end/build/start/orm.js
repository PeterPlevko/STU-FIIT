"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
class CamelCaseNamingStrategy extends Orm_1.SnakeCaseNamingStrategy {
    serializedName(_model, propertyName) {
        return Helpers_1.string.camelCase(propertyName);
    }
}
Orm_1.BaseModel.namingStrategy = new CamelCaseNamingStrategy();
Database_1.default.SimplePaginator.namingStrategy = new CamelCaseNamingStrategy();
//# sourceMappingURL=orm.js.map