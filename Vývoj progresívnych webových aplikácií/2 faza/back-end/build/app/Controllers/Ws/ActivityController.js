"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class ActivityController {
    getUserRoom(user) {
        return `user:${user.id}`;
    }
    async onConnected({ socket, auth, logger }) {
        const room = this.getUserRoom(auth.user);
        const userSockets = await socket.in(room).allSockets();
        if (userSockets.size === 0) {
            socket.broadcast.emit('user:online', auth.user);
        }
        socket.join(room);
        socket.data.userId = auth.user.id;
        const allSockets = await socket.nsp.except(room).fetchSockets();
        const onlineIds = new Set();
        for (const remoteSocket of allSockets) {
            onlineIds.add(remoteSocket.data.userId);
        }
        const onlineUsers = await User_1.default.findMany([...onlineIds]);
        socket.emit('user:list', onlineUsers);
        logger.info('new websocket connection');
    }
    async onDisconnected({ socket, auth, logger }, reason) {
        const room = this.getUserRoom(auth.user);
        const userSockets = await socket.in(room).allSockets();
        if (userSockets.size === 0) {
            socket.broadcast.emit('user:offline', auth.user);
        }
        logger.info('websocket disconnected', reason);
    }
}
exports.default = ActivityController;
//# sourceMappingURL=ActivityController.js.map