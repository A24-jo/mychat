"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRouter = void 0;
const express_1 = require("express");
const user_routes_1 = require("./user.routes");
const contacts_routes_1 = require("./contacts.routes");
const message_routes_1 = require("./message.routes");
class AppRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        router.use('/api/v1/user', user_routes_1.UserRoutes.routes);
        router.use('/api/v1/contacts', contacts_routes_1.Contact.routes);
        router.use('/api/v1/message', message_routes_1.MessageRoutes.routes);
        return router;
    }
}
exports.AppRouter = AppRouter;
