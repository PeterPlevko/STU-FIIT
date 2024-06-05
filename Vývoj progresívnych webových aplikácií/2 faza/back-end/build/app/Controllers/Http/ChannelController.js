"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Channel_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Channel"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class ChannelController {
    async getAllChannels() {
        const channels = await Channel_1.default.all();
        return channels;
    }
    async addChannel({ request }) {
        let data = request.body();
        const channel = await Channel_1.default.create({
            name: data.channelName,
            is_private: data.isPrivate,
            creator_id: data.userId,
        });
        const user = await User_1.default.findByOrFail('id', data.userId);
        await user.related('channels').attach({
            [channel.id]: {
                user_id: data.userId,
                kicked_number: 0,
                status: 'isTopped',
            },
        });
        return channel;
    }
    async getAllUsersFromCurrentChannel({ request }) {
        let nameWithSpaces = request.param('id');
        let name = nameWithSpaces.replace(/%20/g, ' ');
        const channel = await Channel_1.default.findByOrFail('name', name);
        await channel.load('users');
        const users = channel.users;
        return users;
    }
    async getAllNotBannedChannels({ request }) {
        let nickname = request.param('id');
        let user = await User_1.default.findByOrFail('nickname', nickname);
        await user.load('channels');
        let channels = user.channels;
        for (let i = 0; i < channels.length; i++) {
            let channel = channels[i];
            await channel.load('messages');
            let messages = channel.messages;
            let lastMessage = messages[messages.length - 1];
            if (lastMessage !== undefined) {
                let date = new Date(lastMessage.createdAt.toFormat('yyyy-M-d'));
                let now = new Date();
                let diff = now.getTime() - date.getTime();
                let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
                if (diffDays > 30) {
                    await channel.related('users').detach([user.id]);
                }
            }
        }
        user = await User_1.default.findByOrFail('nickname', nickname);
        await user.load('channels');
        channels = user.channels;
        let finalArray = [];
        for (let i = 0; i < channels.length; i++) {
            if (channels[i].$extras.pivot_is_banned === false && channels[i].$extras.pivot_is_deleted === false) {
                channels[i].status = channels[i].$extras.pivot_status;
                await finalArray.push(channels[i]);
            }
        }
        let serializedFinalArray = [];
        for (let i = 0; i < finalArray.length; i++) {
            const serialized = await finalArray[i].serialize();
            serialized.isTopped = finalArray[i].$extras.pivot_is_topped;
            serializedFinalArray.push(serialized);
        }
        return serializedFinalArray;
    }
    async removeUserFromChannel({ request }) {
        let nameWithSpaces = request.param('id');
        let name = nameWithSpaces.replace(/%20/g, ' ');
        let userId = request.body().userId;
        const user = await User_1.default.findByOrFail('id', userId);
        const channel = await Channel_1.default.findByOrFail('name', name);
        await user.related('channels').detach([channel.id]);
        if (channel.creator_id === userId) {
            await channel.related('users').detach(userId);
            await channel.delete();
        }
    }
    async createOrJoinChannel({ request }) {
        let body = request.body();
        let channel = await Channel_1.default.findBy('name', body.channelName);
        if (channel?.is_private) {
            return null;
        }
        else {
            let user = await User_1.default.findByOrFail('id', body.userId);
            if (channel === null) {
                channel = await Channel_1.default.create({
                    name: body.channelName,
                    is_private: body.isPrivate,
                    creator_id: body.userId,
                });
                await user.related('channels').attach({
                    [channel.id]: {
                        kicked_number: 0,
                        is_topped: false,
                        is_banned: false,
                        kicked_by: '',
                        is_deleted: false,
                    },
                });
                return channel;
            }
            else {
                const user = await User_1.default.findByOrFail('id', body.userId);
                let daco = await channel
                    .related('users')
                    .query()
                    .where('nickname', user.nickname)
                    .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'is_banned', 'is_deleted'])
                    .first();
                if (daco !== null) {
                    if (daco.$extras.pivot_is_banned === true) {
                        return null;
                    }
                    else {
                        await channel.related('users').sync({
                            [user.id]: {
                                is_deleted: false,
                            }
                        }, false);
                        return channel;
                    }
                }
                else {
                    await user.related('channels').attach({
                        [channel.id]: {
                            kicked_number: 0,
                            is_topped: false,
                            is_banned: false,
                            kicked_by: '',
                            is_deleted: false,
                        },
                    });
                    return channel;
                }
            }
        }
    }
    async setNotTopped({ request }) {
        let body = request.body();
        let channel = await Channel_1.default.findByOrFail('name', body.channelName);
        let user = await User_1.default.findByOrFail('nickname', body.nickname);
        await channel.related('users').sync({
            [user.id]: {
                is_topped: false,
            }
        }, false);
    }
}
exports.default = ChannelController;
//# sourceMappingURL=ChannelController.js.map