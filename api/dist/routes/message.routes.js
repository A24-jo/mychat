"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoutes = void 0;
const express_1 = require("express");
const message_controllert_1 = require("../controller/message.controllert");
const message_service_1 = require("../service/message.service");
class MessageRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const servise = new message_service_1.MessageService();
        const controller = new message_controllert_1.MessageController(servise);
        router.post('/create', controller.postNewMessage);
        router.post('/allmessages/:userID/:contact', controller.allMessagesContact);
        return router;
    }
}
exports.MessageRoutes = MessageRoutes;
