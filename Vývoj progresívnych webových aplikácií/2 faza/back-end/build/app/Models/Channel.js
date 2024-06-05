"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Message_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Message"));
const User_1 = __importDefault(require("./User"));
class Channel extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Channel.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Channel.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], Channel.prototype, "is_private", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Channel.prototype, "creator_id", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Channel.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Channel.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Message_1.default, {
        foreignKey: 'channel_id',
    }),
    __metadata("design:type", Object)
], Channel.prototype, "messages", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => User_1.default, {
        localKey: 'creator_id',
    }),
    __metadata("design:type", Object)
], Channel.prototype, "user", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => User_1.default, {
        pivotTable: 'user_channels',
        pivotForeignKey: 'channel_id',
        pivotRelatedForeignKey: 'user_id',
        pivotColumns: ['is_topped', 'kicked_number', 'kicked_by', 'is_banned', 'is_deleted'],
        pivotTimestamps: true,
    }),
    __metadata("design:type", Object)
], Channel.prototype, "users", void 0);
exports.default = Channel;
//# sourceMappingURL=Channel.js.map