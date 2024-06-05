"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UserSeeder extends Seeder_1.default {
    async run() {
        await User_1.default.createMany([
            {
                first_name: 'Peter',
                last_name: 'Plevko',
                email: 'pplevko@gmail.com',
                password: '123456789',
                nickname: 'kuntox',
                is_online: true,
                is_dnd: true,
            },
            {
                first_name: 'Roman',
                last_name: 'Palenik',
                email: 'roman.palenik3@gmail.com',
                password: '123456789',
                nickname: 'brzda',
                is_online: true,
                is_dnd: true,
            },
            {
                first_name: 'Matej',
                last_name: 'Delincak',
                email: 'matej.delincak@gmail.com',
                password: '123456789',
                nickname: 'morfex',
                is_online: true,
                is_dnd: true,
            },
            {
                first_name: 'Martin',
                last_name: 'Pirkovsky',
                email: 'm.pirkovsky@gmail.com',
                password: '123456789',
                nickname: 'pirky',
                is_online: true,
                is_dnd: true,
            },
            {
                first_name: 'Matej',
                last_name: 'Pirschel',
                email: 'matejpirschel1@gmail.com',
                password: '123456789',
                nickname: 'pirsch',
                is_online: true,
                is_dnd: true,
            },
        ]);
    }
}
exports.default = UserSeeder;
//# sourceMappingURL=User.js.map