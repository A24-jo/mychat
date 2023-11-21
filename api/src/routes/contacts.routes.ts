import { Router } from "express";
import { ContactController } from "../controller/contact.controllert";
import { ContactService } from "../service/contact.service";

export class Contact {
 
    static get routes(): Router{
       
        const router = Router();

        const service = new ContactService();

        const controller = new ContactController(service);

        router.get('/get-all-contacts/:userId',controller.getAllContactsByUser)
        router.post('/create/:userId/:contactId',controller.postNewContact)

        return router;
    }

}