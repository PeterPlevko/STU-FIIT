"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Channel_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Channel"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class ChannelSeeder extends Seeder_1.default {
    async run() {
        const users = await User_1.default.all();
        users.sort((a, b) => a.id - b.id);
        let channels = await Channel_1.default.createMany([
            {
                name: 'general',
                is_private: false,
                creator_id: undefined,
            },
            {
                name: 'Channel 1',
                is_private: false,
                creator_id: 1,
            },
            {
                name: 'Channel 2',
                is_private: false,
                creator_id: 2,
            },
            {
                name: 'Channel 3',
                is_private: false,
                creator_id: 3,
            },
        ]);
        await users[0].related('channels').attach({
            [channels[0].id]: {
                user_id: users[0].id,
                kicked_number: 0,
                is_topped: true,
                kicked_by: '',
                is_banned: false,
                is_deleted: false,
            },
        }),
            await users[1].related('channels').attach({
                [channels[0].id]: {
                    user_id: users[1].id,
                    kicked_number: 0,
                    is_topped: true,
                    kicked_by: '',
                    is_banned: false,
                    is_deleted: false,
                },
            }),
            await users[2].related('channels').attach({
                [channels[0].id]: {
                    user_id: users[2].id,
                    kicked_number: 0,
                    is_topped: true,
                    kicked_by: '',
                    is_banned: false,
                    is_deleted: false,
                },
            }),
            await users[3].related('channels').attach({
                [channels[0].id]: {
                    user_id: users[3].id,
                    kicked_number: 0,
                    is_topped: true,
                    kicked_by: '',
                    is_banned: false,
                    is_deleted: false,
                },
            }),
            await users[0].related('channels').attach({
                [channels[1].id]: {
                    user_id: users[0].id,
                    kicked_number: 0,
                    is_topped: true,
                    kicked_by: '',
                    is_banned: false,
                    is_deleted: false,
                },
            }),
            await users[1].related('channels').attach({
                [channels[1].id]: {
                    user_id: users[1].id,
                    kicked_number: 0,
                    is_topped: true,
                    kicked_by: '',
                    is_banned: false,
                    is_deleted: false,
                },
            });
        await users[2].related('channels').attach({
            [channels[2].id]: {
                user_id: users[2].id,
                kicked_number: 0,
                is_topped: true,
                kicked_by: '',
                is_banned: false,
                is_deleted: false,
            },
        }),
            await users[3].related('channels').attach({
                [channels[2].id]: {
                    user_id: users[3].id,
                    kicked_number: 0,
                    is_topped: true,
                    kicked_by: '',
                    is_banned: false,
                    is_deleted: false,
                },
            });
        await users[0].related('channels').attach({
            [channels[3].id]: {
                user_id: users[0].id,
                kicked_number: 0,
                is_topped: true,
                kicked_by: '',
                is_banned: false,
                is_deleted: false,
            },
        });
        await users[1].related('channels').attach({
            [channels[3].id]: {
                user_id: users[1].id,
                kicked_number: 0,
                is_topped: true,
                kicked_by: '',
                is_banned: false,
                is_deleted: false,
            },
        });
        await users[2].related('channels').attach({
            [channels[3].id]: {
                user_id: users[2].id,
                kicked_number: 0,
                is_topped: true,
                kicked_by: '',
                is_banned: false,
                is_deleted: false,
            },
        });
        await users[3].related('channels').attach({
            [channels[3].id]: {
                user_id: users[3].id,
                kicked_number: 0,
                is_topped: true,
                kicked_by: '',
                is_banned: false,
                is_deleted: false,
            },
        });
        await users[4].related('channels').attach({
            [channels[3].id]: {
                user_id: users[4].id,
                kicked_number: 0,
                is_topped: true,
                kicked_by: '',
                is_banned: false,
                is_deleted: false,
            },
        });
    }
}
exports.default = ChannelSeeder;
//# sourceMappingURL=Channel.js.map