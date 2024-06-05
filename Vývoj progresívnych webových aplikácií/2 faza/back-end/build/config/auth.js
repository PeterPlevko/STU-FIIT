"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const authConfig = {
    guard: 'api',
    guards: {
        api: {
            driver: 'oat',
            tokenProvider: {
                type: 'api',
                driver: 'database',
                table: 'api_tokens',
                foreignKey: 'user_id',
            },
            provider: {
                driver: 'lucid',
                identifierKey: 'id',
                uids: ['email'],
                model: () => Promise.resolve().then(() => __importStar(global[Symbol.for('ioc.use')]('App/Models/User'))),
            },
        },
    },
};
exports.default = authConfig;
//# sourceMappingURL=auth.js.map