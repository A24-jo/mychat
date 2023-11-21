import { Request, Response } from "express";
import { MessageService } from "../service/message.service";

export class MessageController {

    messageServise: MessageService;

    constructor(messageServise: MessageService) {
        this.messageServise = messageServise;
    }

    postNewMessage = async (req: Request, res: Response) => {

        const mesage = req.body;
        const result = await this.messageServise.createNewMessage(mesage)
        return res.status(200).json(result);

    }

    allMessagesContact = async (req: Request, res: Response) => {
        const userID = req.params.userID;
        const contact = req.params.contact;
        const message = await this.messageServise.allMessageUserContact(userID, contact);
        return res.status(200).json(message);
    }
}