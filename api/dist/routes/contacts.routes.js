"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const express_1 = require("express");
const contact_controllert_1 = require("../controller/contact.controllert");
const contact_service_1 = require("../service/contact.service");
class Contact {
    static get routes() {
        const router = (0, express_1.Router)();
        const service = new contact_service_1.ContactService();
        const controller = new contact_controllert_1.ContactController(service);
        router.get('/get-all-contacts/:userId', controller.getAllContactsByUser);
        router.post('/create/:userId/:contactId', controller.postNewContact);
        return router;
    }
}
exports.Contact = Contact;
