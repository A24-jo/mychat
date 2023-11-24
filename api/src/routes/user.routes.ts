import { Router } from "express";
import { UserController } from "../controller/user.controllert";
import { UserService } from "../service/user.service";
import { UuidAdapter } from "../config/uuid";
import { BcryptAdapter } from "../config/byscript";
import { JwtAdapter } from "../config/jwt";

export class UserRoutes {
  static get routes(): Router {

    const router = Router()

    const userservice = new UserService(
      UuidAdapter.uuidGenerator,
      BcryptAdapter.hash,
      BcryptAdapter.compare,
      JwtAdapter.generateToken
    );

    const controller = new UserController(userservice);

    router.post('/register', controller.registerUser);
    router.post('/login', controller.loginUser);
    router.get('/get_all_users/:userId', controller.getAllUsers);
    router.get('/perfil/:userId', controller.getUserPerfil);
    router.get('/notifications/:userId', controller.getNotificationsUser);
    router.get('/received/:userId/:status', controller.getReceiverMessage);
    router.get('/visible/:userId/:contactId',controller.getVistoMessage);
    router.post('/update',controller.postUsermodified)

    return router;
  }
}