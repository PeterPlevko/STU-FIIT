"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Channel_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Channel"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UsersController {
    constructor() { }
    async sendToServer({ socket }, channelName, userId) {
        let wasUserCreator = false;
        const user = await User_1.default.findByOrFail('id', userId);
        const channel = await Channel_1.default.findByOrFail('name', channelName);
        await user.related('channels').detach([channel.id]);
        if (channel.creator_id === userId) {
            await channel.related('users').detach([userId]);
            await channel.delete();
            wasUserCreator = true;
        }
        socket.broadcast.emit('removeUserFromServerResponse', wasUserCreator, channelName);
    }
    async ownerQuitRequest({ socket }, channelName, userId) {
        let wasUserCreator = false;
        const user = await User_1.default.findByOrFail('id', userId);
        const channel = await Channel_1.default.findByOrFail('name', channelName);
        await user.related('channels').sync({
            [channel.id]: {
                is_deleted: true,
            }
        }, false);
        if (channel.creator_id === userId) {
            wasUserCreator = true;
        }
        socket.broadcast.emit('ownerQuitResponse', wasUserCreator, channelName);
    }
    async inviteUserToChannel({ socket }, nickname, channelName, userId) {
        const user = await User_1.default.findByOrFail('nickname', nickname);
        const channel = await Channel_1.default.findByOrFail('name', channelName);
        if (channel.is_private) {
            if (channel.creator_id === userId) {
                let daco = await channel
                    .related('users')
                    .query()
                    .where('nickname', nickname)
                    .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'is_banned', 'is_deleted'])
                    .first();
                if (daco) {
                    await user.related('channels').sync({
                        [channel.id]: {
                            is_banned: false,
                            kicked_number: 0,
                            is_topped: true,
                            kicked_by: '',
                            is_deleted: false,
                        }
                    }, false);
                    socket.broadcast.emit('inviteUserToChannelResponse', nickname, channel, channel.is_private, true);
                }
                else {
                    await user.related('channels').attach({
                        [channel.id]: {
                            is_banned: false,
                            kicked_number: 0,
                            is_topped: true,
                            kicked_by: '',
                            is_deleted: false,
                        },
                    });
                    socket.broadcast.emit('inviteUserToChannelResponse', nickname, channel, channel.is_private, true);
                }
            }
            else {
                socket.broadcast.emit('inviteUserToChannelResponse', null, null, null, null);
            }
        }
        else {
            let daco = await channel
                .related('users')
                .query()
                .where('nickname', nickname)
                .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'is_banned'])
                .first();
            if (daco) {
                if (daco.$extras.pivot_is_banned === true) {
                    if (channel.creator_id === userId) {
                        await user.related('channels').sync({
                            [channel.id]: {
                                is_banned: false,
                                kicked_number: 0,
                                is_topped: true,
                                kicked_by: '',
                                is_deleted: false,
                            }
                        }, false);
                        socket.broadcast.emit('inviteUserToChannelResponse', nickname, channel, channel.is_private, true);
                    }
                    else {
                        socket.broadcast.emit('inviteUserToChannelResponse', null, null, null, null);
                    }
                }
                else {
                    socket.broadcast.emit('inviteUserToChannelResponse', nickname, channel, channel.is_private, true);
                }
            }
            else {
                await user.related('channels').attach({
                    [channel.id]: {
                        is_banned: false,
                        kicked_number: 0,
                        is_topped: true,
                        kicked_by: '',
                        is_deleted: false,
                    },
                });
                socket.broadcast.emit('inviteUserToChannelResponse', nickname, channel, channel.is_private, true);
            }
        }
    }
    async notifyAboutCreation({ socket }, channelName) {
        socket.broadcast.emit('notifyAboutCreationResponse', channelName);
    }
    async kickUserFromChannelRequest({ socket }, channelName, nickname, userIdThatKicked) {
        const channel = await Channel_1.default.findByOrFail('name', channelName);
        const user = await User_1.default.findByOrFail('nickname', nickname);
        const userThatKickedHim = await User_1.default.findByOrFail('id', userIdThatKicked);
        let daco = await channel
            .related('users')
            .query()
            .where('nickname', nickname)
            .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'is_banned', 'is_deleted'])
            .first();
        if (daco === null) {
            socket.broadcast.emit('kickUserFromChannelResponse', null, null);
        }
        else {
            if (daco.$extras.pivot_kicked_by === '') {
                await channel.related('users').sync({
                    [user.id]: {
                        kicked_number: daco.$extras.pivot_kicked_number + 1,
                        kicked_by: userThatKickedHim.nickname,
                    }
                }, false);
                socket.broadcast.emit('kickUserFromChannelResponse', channelName, nickname);
            }
            else {
                if (daco.$extras.pivot_kicked_by.includes(userThatKickedHim.nickname)) {
                }
                else {
                    await channel.related('users').sync({
                        [user.id]: {
                            kicked_number: daco.$extras.pivot_kicked_number + 1,
                            kicked_by: daco.$extras.pivot_kicked_by + userThatKickedHim.nickname,
                        }
                    }, false);
                }
            }
            daco = await channel
                .related('users')
                .query()
                .where('nickname', nickname)
                .pivotColumns(['is_topped', 'kicked_number', 'kicked_by', 'is_banned', 'is_deleted'])
                .first();
            if (channel.creator_id === userIdThatKicked) {
                await channel.related('users').sync({
                    [user.id]: {
                        is_banned: true,
                    }
                }, false);
                socket.broadcast.emit('kickUserFromChannelResponse', channelName, nickname);
            }
            else {
                if (daco.$extras.pivot_kicked_number >= 3) {
                    await channel.related('users').sync({
                        [user.id]: {
                            is_banned: true,
                        }
                    }, false);
                    socket.broadcast.emit('kickUserFromChannelResponse', channelName, nickname);
                }
                else {
                    socket.broadcast.emit('kickUserFromChannelResponse', null, null);
                }
            }
        }
    }
    async revokeUserRequest({ socket }, channelName, nickname, userId) {
        const user = await User_1.default.findByOrFail('nickname', nickname);
        const channel = await Channel_1.default.findByOrFail('name', channelName);
        if (channel.is_private) {
            if (channel.creator_id === userId) {
                await user.related('channels').detach([channel.id]);
            }
            socket.broadcast.emit('revokeUserResponse', channelName, nickname);
        }
        else {
        }
    }
}
exports.default = UsersController;
//# sourceMappingURL=UserController.js.map