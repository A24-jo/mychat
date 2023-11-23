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
exports.ContactService = void 0;
const user_entity_1 = require("../entities/user.entity");
class ContactService {
    constructor() { }
    getAllContactsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shearch = yield user_entity_1.UserEntity.findOne({ where: { userId } });
                if (!shearch)
                    return [];
                if ((shearch === null || shearch === void 0 ? void 0 : shearch.friends.length) === 0)
                    return [];
                const contacts = yield user_entity_1.UserEntity.createQueryBuilder("user")
                    .where('user.userId IN (:...userId)', { userId: shearch.friends })
                    .getMany();
                return contacts;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
    postNewContactService(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_entity_1.UserEntity.findOne({ where: { userId } });
                if (!user)
                    throw Error("ocuarrio un error");
                if (user.friends.includes(contactId))
                    return "este contacto ya existe";
                if (user) {
                    user.friends.push(contactId);
                    yield user_entity_1.UserEntity.save(user);
                }
                const contact = yield user_entity_1.UserEntity.findOne({ where: { userId: contactId } });
                if (!contact)
                    throw Error("ubo un erro al buscarl al amigo");
                return contact;
            }
            catch (error) {
                console.error(error);
                return {};
            }
        });
    }
}
exports.ContactService = ContactService;
