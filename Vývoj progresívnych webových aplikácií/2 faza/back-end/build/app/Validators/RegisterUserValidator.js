"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class RegisterUserValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            email: Validator_1.schema.string({}, [
                Validator_1.rules.email(),
                Validator_1.rules.unique({ table: 'users', column: 'email' })
            ]),
            password: Validator_1.schema.string({}, [
                Validator_1.rules.minLength(8),
                Validator_1.rules.confirmed('passwordConfirmation')
            ]),
            firstName: Validator_1.schema.string({}, []),
            lastName: Validator_1.schema.string({}, []),
            nickname: Validator_1.schema.string({}, [
                Validator_1.rules.unique({ table: 'users', column: 'nickname' })
            ]),
            state: Validator_1.schema.string({}, []),
        });
        this.messages = {};
    }
}
exports.default = RegisterUserValidator;
//# sourceMappingURL=RegisterUserValidator.js.map