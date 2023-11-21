import { UserEntity } from "../entities/user.entity";

export class ContactService {
    constructor() { }

    async getAllContactsByUser(userId: string): Promise<UserEntity[]> {

        try {
            const shearch = await UserEntity.findOne({ where: { userId } });

            if (!shearch) return [];

            if (shearch?.friends.length === 0) return [];

            const contacts = await UserEntity.createQueryBuilder("user")
                .where('user.userId IN (:...userId)', { userId: shearch.friends })
                .getMany();

            return contacts;

        } catch (error) {

            console.error(error);
            return [];

        }

    }

    async postNewContactService(userId: string, contactId: string): Promise<UserEntity | {}> {
        try {
            
            const user = await UserEntity.findOne({ where: { userId } });
            if (!user) throw Error("ocuarrio un error");

            if (user.friends.includes(contactId)) return "este contacto ya existe";

            if (user) {
                user.friends.push(contactId);
                await UserEntity.save(user);
            }

            const contact = await UserEntity.findOne({ where: { userId: contactId } });
            if (!contact) throw Error("ubo un erro al buscarl al amigo");

            return contact;

        } catch (error) {

            console.error(error);
            return {};

        }
    }
}