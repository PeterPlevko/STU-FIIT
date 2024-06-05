"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async () => {
    return { hello: 'world' };
});
Route_1.default.group(() => {
    Route_1.default.post('register', 'AuthController.register');
    Route_1.default.post('login', 'AuthController.login');
    Route_1.default.post('logout', 'AuthController.logout').middleware('auth');
    Route_1.default.get('me', 'AuthController.me').middleware('auth');
}).prefix('auth');
Route_1.default.post('getAllChannels', 'ChannelController.getAllChannels');
Route_1.default.patch('setDnd/:id', 'UsersController.setDnd');
Route_1.default.patch('setOnline/:id', 'UsersController.setOnline');
Route_1.default.post('addChannel', 'ChannelController.addChannel');
Route_1.default.get('getAllUsersFromCurrentChannel/:id', 'ChannelController.getAllUsersFromCurrentChannel');
Route_1.default.delete('removeUserFromChannel/:id', 'ChannelController.removeUserFromChannel');
Route_1.default.post('createOrJoinChannel', 'ChannelController.createOrJoinChannel');
Route_1.default.get('getAllNotBannedChannels/:id', 'ChannelController.getAllNotBannedChannels');
Route_1.default.post('setNotTopped', 'ChannelController.setNotTopped');
//# sourceMappingURL=routes.js.map