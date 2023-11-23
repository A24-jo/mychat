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
exports.UserService = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("../entities/message.entity");
class UserService {
    constructor(uuidGenerator, hashGenerator, compareBcrypt, jsonGenerator) {
        this.uuid = uuidGenerator;
        this.hashType = hashGenerator;
        this.compareType = compareBcrypt;
        this.jwtTypes = jsonGenerator;
    }
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, name, password, phone } = user;
                const sheach = yield user_entity_1.UserEntity.findOne({
                    where: [
                        { email: (0, typeorm_2.Like)(email) },
                        { phone: (0, typeorm_2.Like)(phone) },
                    ],
                });
                if (sheach)
                    throw Error('user exists already');
                const userId = this.uuid();
                password = this.hashType(password);
                const createuser = user_entity_1.UserEntity.create({
                    email,
                    name,
                    password,
                    phone,
                    userId
                });
                yield createuser.save();
                return 1;
            }
            catch (error) {
                console.error(error);
                return 0;
            }
        });
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { email, phone, password } = payload;
                const sheach = yield user_entity_1.UserEntity.findOne({
                    where: [
                        { email: (0, typeorm_2.Like)(email) },
                        { phone: (0, typeorm_2.Like)(phone) },
                    ],
                });
                if (!sheach)
                    throw Error('not exist a user');
                const ValidatePassword = this.compareType(password, sheach.password);
                if (!ValidatePassword)
                    throw Error('password incorrect');
                const token = this.jwtTypes(payload);
                delete sheach.password;
                return { user: sheach, token };
            }
            catch (error) {
                console.error(error);
                return { error: error };
            }
        });
    }
    getUsers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_entity_1.UserEntity.find({
                    where: {
                        userId: (0, typeorm_1.Not)(userId)
                    },
                    select: ['userId', 'active', 'avatar', 'createAt', 'email', 'id', 'phone', 'updatedAt', 'name']
                });
                return users;
            }
            catch (error) {
                console.log(error);
                return [];
            }
        });
    }
    perfil(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_entity_1.UserEntity.findOne({ where: { userId: userId } });
                if (!user)
                    throw Error("ocurrio un error ");
                return user;
            }
            catch (error) {
                console.error(error);
                return {};
            }
        });
    }
    notification(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allMessage = yield message_entity_1.MessageEntity.find({
                    where: [
                        { receiver: userId },
                    ]
                });
                if (allMessage.length === 0)
                    throw Error("not new message");
                const data = allMessage.filter(message => message.status === "1");
                if (data.length === 0)
                    return [];
                return data;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
    receivedMessage(userId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allMessage = yield message_entity_1.MessageEntity.find({
                    where: [
                        { receiver: userId },
                    ]
                });
                allMessage.forEach((message) => __awaiter(this, void 0, void 0, function* () {
                    if (message.status === "0") {
                        message.status = status;
                        yield message.save();
                    }
                    if (message.status === "1") {
                        message.status = status;
                        yield message.save();
                    }
                }));
                return "ok";
            }
            catch (error) {
                console.error(error);
                return "failed";
            }
        });
    }
    vistoMessage(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allMessage = yield message_entity_1.MessageEntity.find({
                    where: [
                        { receiver: userId },
                    ]
                });
                allMessage.forEach((message) => __awaiter(this, void 0, void 0, function* () {
                    if (message.sender === contactId) {
                        message.status = "2";
                        yield message.save();
                    }
                }));
                const data = allMessage.filter(message => message.status === "1");
                return data;
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
}
exports.UserService = UserService;
