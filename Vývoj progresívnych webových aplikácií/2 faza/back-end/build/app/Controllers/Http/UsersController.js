"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UsersController {
    async setDnd({ request }) {
        let id = request.param('id');
        let body = request.body();
        const user = await User_1.default.findByOrFail('id', id);
        user.is_dnd = body.isDnd;
        let changedUser = await user.save();
        return changedUser;
    }
    async setOnline({ request }) {
        let id = request.param('id');
        let body = request.body();
        const user = await User_1.default.findByOrFail('id', id);
        user.is_online = body.isOnline;
        let changedUser = await user.save();
        return changedUser;
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map