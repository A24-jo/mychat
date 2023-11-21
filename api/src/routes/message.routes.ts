import { Router } from "express";
import { MessageController } from "../controller/message.controllert";
import { MessageService } from "../service/message.service";

export class MessageRoutes{

    static get routes():Router {
    
        const router = Router();

        const servise = new MessageService();

        const controller = new MessageController(servise);

        router.post('/create',controller.postNewMessage)
        router.post('/allmessages/:userID/:contact',controller.allMessagesContact)

        return router;
    }
}