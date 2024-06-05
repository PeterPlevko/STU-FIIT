"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Message_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Message"));
class MessageSeeder extends Seeder_1.default {
    async run() {
        await Message_1.default.createMany([
            {
                user_id: 1,
                channel_id: 1,
                content: 'general',
            },
            {
                user_id: 1,
                channel_id: 2,
                content: 'Ahoj Roman ako sa mas ?',
            },
            {
                user_id: 2,
                channel_id: 2,
                content: 'Ahoj Peter mam sa dobre, dakujem za opytanie. Ty sa mas ako ?',
            },
            {
                user_id: 1,
                channel_id: 2,
                content: 'Mam sa dobre, co mas nove ?',
            },
            {
                user_id: 2,
                channel_id: 2,
                content: 'Nic nemam nove vsetko po starom a ty mas nieco nove ?',
            },
            {
                user_id: 1,
                channel_id: 2,
                content: 'Ja mam nove boty za 50 eur',
            },
            {
                user_id: 2,
                channel_id: 2,
                content: 'Frajerina',
            },
            {
                user_id: 3,
                channel_id: 3,
                content: 'Ahoj Martin ako sa mas ?',
            },
            {
                user_id: 4,
                channel_id: 3,
                content: 'Ahoj Matej mam sa dobre, dakujem za opytanie. Ty sa mas ako ?',
            },
            {
                user_id: 3,
                channel_id: 3,
                content: 'Mam sa dobre, co mas nove ?',
            },
            {
                user_id: 4,
                channel_id: 3,
                content: 'Nic nemam nove vsetko po starom a ty mas nieco nove ?',
            },
            {
                user_id: 3,
                channel_id: 3,
                content: 'Ja mam nove boty za 60 eur',
            },
            {
                user_id: 4,
                channel_id: 3,
                content: 'Velka frajerina',
            },
            {
                user_id: 1,
                channel_id: 4,
                content: 'Moje meno je Peter.',
            },
            {
                user_id: 2,
                channel_id: 4,
                content: 'Moje meno je Roman',
            },
            {
                user_id: 3,
                channel_id: 4,
                content: 'Moje meno je Matej',
            },
            {
                user_id: 4,
                channel_id: 4,
                content: 'Moje meno je Martin',
            },
            {
                user_id: 1,
                channel_id: 4,
                content: 'Ja mam nove boty za 10 eur',
            },
            {
                user_id: 2,
                channel_id: 4,
                content: 'Ja mam nove boty za 20 eur',
            },
            {
                user_id: 3,
                channel_id: 4,
                content: 'Ja mam nove boty za 30 eur',
            },
            {
                user_id: 4,
                channel_id: 4,
                content: 'Ja mam nove boty za 40 eur',
            },
        ]);
    }
}
exports.default = MessageSeeder;
//# sourceMappingURL=Message.js.map