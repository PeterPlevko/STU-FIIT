"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const standalone_1 = require("@adonisjs/core/build/standalone");
let MessageController = class MessageController {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async loadMessages({ params }, pagination) {
        return this.messageRepository.getAll(params.name, pagination);
    }
    async addMessage({ params, socket, auth }, content) {
        const message = await this.messageRepository.create(params.name, auth.user.id, content);
        socket.broadcast.emit('message', message);
        return message;
    }
    async sendRTMessageRequest({ socket }, channelName, senderNickname, message) {
        socket.broadcast.emit('sendRTMessageResponse', channelName, senderNickname, message);
    }
};
MessageController = __decorate([
    (0, standalone_1.inject)(['Repositories/MessageRepository']),
    __metadata("design:paramtypes", [Object])
], MessageController);
exports.default = MessageController;
//# sourceMappingURL=MessageController.js.map