"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Messages extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'messages';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');
            table
                .integer('channel_id')
                .unsigned()
                .references('id')
                .inTable('channels')
                .onDelete('CASCADE');
            table.text('content');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Messages;
//# sourceMappingURL=1649242598334_messages.js.map