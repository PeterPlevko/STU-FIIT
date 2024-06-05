"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppProvider {
    constructor(app) {
        this.app = app;
    }
    register() {
        this.app.container.singleton('Repositories/MessageRepository', (container) => {
            return container.make('App/Repositories/MessageRepository');
        });
    }
    async boot() {
    }
    async ready() {
    }
    async shutdown() {
    }
}
exports.default = AppProvider;
//# sourceMappingURL=AppProvider.js.map