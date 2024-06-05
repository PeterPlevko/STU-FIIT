"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ws_1 = __importDefault(global[Symbol.for('ioc.use')]("Ruby184/Socket.IO/Ws"));
Ws_1.default.namespace('/')
    .connected('ActivityController.onConnected')
    .disconnected('ActivityController.onDisconnected');
Ws_1.default.namespace('channels/:name')
    .on('loadMessages', 'MessageController.loadMessages')
    .on('addMessage', 'MessageController.addMessage')
    .on('removeUserFromServerRequest', 'UserController.sendToServer')
    .on('inviteUserToChannelRequest', 'UserController.inviteUserToChannel')
    .on('notifyAboutCreationRequest', 'UserController.notifyAboutCreation')
    .on('kickUserFromChannelRequest', 'UserController.kickUserFromChannelRequest')
    .on('ownerQuitRequest', 'UserController.ownerQuitRequest')
    .on('revokeUserRequest', 'UserController.revokeUserRequest')
    .on('sendRTMessageRequest', 'MessageController.sendRTMessageRequest');
//# sourceMappingURL=socket.js.map