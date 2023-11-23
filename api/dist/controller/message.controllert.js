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
exports.MessageController = void 0;
class MessageController {
    constructor(messageServise) {
        this.postNewMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const mesage = req.body;
            const result = yield this.messageServise.createNewMessage(mesage);
            return res.status(200).json(result);
        });
        this.allMessagesContact = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userID = req.params.userID;
            const contact = req.params.contact;
            const message = yield this.messageServise.allMessageUserContact(userID, contact);
            return res.status(200).json(message);
        });
        this.messageServise = messageServise;
    }
}
exports.MessageController = MessageController;
