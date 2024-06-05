"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Channel_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Channel"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const RegisterUserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/RegisterUserValidator"));
class AuthController {
    async register({ request }) {
        const data = await request.validate(RegisterUserValidator_1.default);
        const user = await User_1.default.create(data);
        const general = await Channel_1.default.findByOrFail('name', 'general');
        await user.related('channels').attach({
            [general.id]: {
                status: 'isTopped',
                kicked_number: 0,
            }
        });
        return user;
    }
    async login({ auth, request }) {
        const email = request.input('email');
        const password = request.input('password');
        return auth.use('api').attempt(email, password);
    }
    async logout({ auth }) {
        return auth.use('api').logout();
    }
    async me({ auth }) {
        await auth.user.load('channels');
        return auth.user;
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map