"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Channel_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Channel"));
class MessageRepository {
    async getAll(channelName, pagination) {
        const channel = await Channel_1.default.query()
            .where('name', channelName)
            .preload('messages', (messagesQuery) => {
            messagesQuery.preload('author')
                .orderBy('created_at', 'asc')
                .groupLimit(pagination);
        })
            .firstOrFail();
        return channel.messages.map((message) => message.serialize());
    }
    async create(channelName, userId, content) {
        const channel = await Channel_1.default.findByOrFail('name', channelName);
        const message = await channel.related('messages').create({ user_id: userId, channel_id: channel.id, content: content });
        await message.load('author');
        return message.serialize();
    }
}
exports.default = MessageRepository;
//# sourceMappingURL=MessageRepository.js.map