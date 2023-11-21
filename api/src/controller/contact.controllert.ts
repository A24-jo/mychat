import { Request, Response } from "express";
import { ContactService } from "../service/contact.service";

export class ContactController {
    
    contactService: ContactService

    constructor(contactService:ContactService){
        this.contactService = contactService;
    }

    getAllContactsByUser = async (req:Request,res:Response) => {
        const contacts = await this.contactService.getAllContactsByUser(req.params.userId);
        return res.status(200).json(contacts);
    }

    postNewContact = async (req: Request, res: Response) => {
        const{userId,contactId} = req.params;
        const theNewContact = await this.contactService.postNewContactService(userId,contactId);
        return res.status(200).json(theNewContact)
    }
}