import { Request, Response } from "express";
import { UserService } from "../service/user.service";

export class UserController {

    userService: UserService

    constructor(userServise: UserService) {
        this.userService = userServise
    }

    registerUser = async (req: Request, res: Response) => {

        let data = await this.userService.register(req.body);

        if (!data) return res.status(409).json({ message: "register failed" });

        return res.status(201).json({ message: "register existing" });
    }

    loginUser = async (req: Request, res: Response) => {

        const existsLogin = await this.userService.login(req.body);
        if (existsLogin.user) return res.status(200).json( existsLogin );

        return res.status(401).json({ message: "failed to login" })
    }

    getAllUsers = async (req: Request, res: Response) => {

        const user: string = req.params.userId;
        const getall = await this.userService.getUsers(user);
        return res.status(200).json(getall);

    }

    getUserPerfil = async (req: Request, res: Response) => {

        const userId = req.params.userId;
        const sheach = await this.userService.perfil(userId);
        if(Object.entries(sheach).length === 0) return res.status(403);
        return res.status(200).json(sheach);
        
    }

    getNotificationsUser = async (req: Request , res: Response) => {

        const userId = req.params.userId;
        const sherach = await this.userService.notification(userId);
        if(sherach.length === 0) return res.status(200).json(sherach);
        return res.status(200).json(sherach);
    }

    getReceiverMessage = async (req: Request, res: Response) => {
      
        const userId = req.params.userId;
        const status = req.params.status;
        const sherach = await this.userService.receivedMessage(userId, status);
        if (sherach === "failed") return res.status(400).json(sherach);
        return res.status(200).json(sherach);
    }

    getVistoMessage = async (req: Request, res: Response) => {
      
        const userId = req.params.userId;
        const contactId = req.params.contactId;
        const sherach = await this.userService.vistoMessage(userId, contactId);
        if (sherach.length === 0 ) return res.status(400).json(sherach);
        return res.status(200).json(sherach);
    }

    postUsermodified =async (req:Request,res:Response) => {

        const user = req.body ;
        const results = await this.userService.ediPerfil(user);
        if(results === 'ocuarrio un error') return res.status(404).json(results);
        return res.status(200).json(results);
        
    }


}