import { MessageEntity } from "../entities/message.entity";
import { MessageDTO } from "../interfaces/message";

export class MessageService {

    constructor() { }

    async createNewMessage(mesage: MessageDTO): Promise<boolean> {
        try {
            const { message, sender, receiver, status, type } = mesage;
            if (!sender || !receiver || !status || !type) throw Error("ocurrio un error ")
            const newMessage = MessageEntity.create({
                message,
                sender,
                receiver,
                status,
                type
            });
            await newMessage.save();

            return true

        } catch (error) {

            console.error(error);
            return false;

        }
    }

    async allMessageUserContact(userID: string, contact: string): Promise<MessageEntity[]> {
        try {

            const allMessage = await MessageEntity.find({
            where: [
                    { sender: userID, receiver: contact },
                    { sender: contact, receiver: userID },
                ]
            });

            return allMessage;

        } catch (error) {

            console.error(error);
            return [];

        }
    }
}