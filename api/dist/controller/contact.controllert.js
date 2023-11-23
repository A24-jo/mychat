"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
class ContactController {
    constructor(contactService) {
        this.getAllContactsByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const contacts = yield this.contactService.getAllContactsByUser(req.params.userId);
            return res.status(200).json(contacts);
        });
        this.postNewContact = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { userId, contactId } = req.params;
            const theNewContact = yield this.contactService.postNewContactService(userId, contactId);
            return res.status(200).json(theNewContact);
        });
        this.contactService = contactService;
    }
}
exports.ContactController = ContactController;
