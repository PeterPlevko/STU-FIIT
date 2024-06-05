"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Channels extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'channels';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name').notNullable().unique();
            table.boolean('is_private').notNullable();
            table
                .integer('creator_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Channels;
//# sourceMappingURL=1649242587304_channels.js.map