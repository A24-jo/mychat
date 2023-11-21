import { Router } from "express";
import { UserRoutes } from "./user.routes";
import { Contact } from "./contacts.routes";
import { MessageRoutes } from "./message.routes";

export class AppRouter {
    static get routes(): Router {
        const router = Router()

      router.use('/api/v1/user',UserRoutes.routes);
      router.use('/api/v1/contacts',Contact.routes);
      router.use('/api/v1/message', MessageRoutes.routes);

        return router
    }
}