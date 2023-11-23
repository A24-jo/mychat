"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controllert_1 = require("../controller/user.controllert");
const user_service_1 = require("../service/user.service");
const uuid_1 = require("../config/uuid");
const byscript_1 = require("../config/byscript");
const jwt_1 = require("../config/jwt");
class UserRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const userservice = new user_service_1.UserService(uuid_1.UuidAdapter.uuidGenerator, byscript_1.BcryptAdapter.hash, byscript_1.BcryptAdapter.compare, jwt_1.JwtAdapter.generateToken);
        const controller = new user_controllert_1.UserController(userservice);
        router.post('/register', controller.registerUser);
        router.post('/login', controller.loginUser);
        router.get('/get_all_users/:userId', controller.getAllUsers);
        router.get('/perfil/:userId', controller.getUserPerfil);
        router.get('/notifications/:userId', controller.getNotificationsUser);
        router.get('/received/:userId/:status', controller.getReceiverMessage);
        router.get('/visible/:userId/:contactId', controller.getVistoMessage);
        return router;
    }
}
exports.UserRoutes = UserRoutes;
