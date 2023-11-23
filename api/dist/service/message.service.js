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
exports.MessageService = void 0;
const message_entity_1 = require("../entities/message.entity");
class MessageService {
    constructor() { }
    createNewMessage(mesage) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, sender, receiver, status, type } = mesage;
                if (!sender || !receiver || !status || !type)
                    throw Error("ocurrio un error ");
                const newMessage = message_entity_1.MessageEntity.create({
                    message,
                    sender,
                    receiver,
                    status,
                    type
                });
                yield newMessage.save();
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    allMessageUserContact(userID, contact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allMessage = yield message_entity_1.MessageEntity.find({
                    where: [
                        { sender: userID, receiver: contact },
                        { sender: contact, receiver: userID },
                    ]
                });
                return allMessage;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
}
exports.MessageService = MessageService;
