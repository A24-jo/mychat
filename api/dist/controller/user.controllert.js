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
exports.UserController = void 0;
class UserController {
    constructor(userServise) {
        this.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let data = yield this.userService.register(req.body);
            if (!data)
                return res.status(409).json({ message: "register failed" });
            return res.status(201).json({ message: "register existing" });
        });
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const existsLogin = yield this.userService.login(req.body);
            if (existsLogin.user)
                return res.status(200).json(existsLogin);
            return res.status(401).json({ message: "failed to login" });
        });
        this.getAllUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.params.userId;
            const getall = yield this.userService.getUsers(user);
            return res.status(200).json(getall);
        });
        this.getUserPerfil = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const sheach = yield this.userService.perfil(userId);
            if (Object.entries(sheach).length === 0)
                return res.status(403);
            return res.status(200).json(sheach);
        });
        this.getNotificationsUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const sherach = yield this.userService.notification(userId);
            if (sherach.length === 0)
                return res.status(200).json(sherach);
            return res.status(200).json(sherach);
        });
        this.getReceiverMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const status = req.params.status;
            const sherach = yield this.userService.receivedMessage(userId, status);
            if (sherach === "failed")
                return res.status(400).json(sherach);
            return res.status(200).json(sherach);
        });
        this.getVistoMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const contactId = req.params.contactId;
            const sherach = yield this.userService.vistoMessage(userId, contactId);
            if (sherach.length === 0)
                return res.status(400).json(sherach);
            return res.status(200).json(sherach);
        });
        this.userService = userServise;
    }
}
exports.UserController = UserController;
