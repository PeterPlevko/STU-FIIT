"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class UserChannels extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'user_channels';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE');
            table.integer('channel_id').unsigned().references('channels.id').onDelete('CASCADE');
            table.boolean('is_topped').notNullable();
            table.integer('kicked_number').notNullable();
            table.string('kicked_by').notNullable();
            table.boolean('is_banned').notNullable();
            table.boolean('is_deleted').notNullable();
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = UserChannels;
//# sourceMappingURL=1649488210052_user_channels.js.map