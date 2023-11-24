import { Not } from 'typeorm';
import { UserEntity } from "../entities/user.entity";
import { ReturnUserLoged, UserLoginDto, UserRegisterDto } from "../interfaces/user";
import { Like } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';

type uuidType = () => string;
type hashType = (password: string) => string;
type compareType = (password: string, hashed: string) => boolean;
type jwtType = (payload: Object) => string;

export class UserService {

    uuid: uuidType
    hashType: hashType
    compareType: compareType
    jwtTypes: jwtType


    constructor(
        uuidGenerator: uuidType,
        hashGenerator: hashType,
        compareBcrypt: compareType,
        jsonGenerator: jwtType
    ) {
        this.uuid = uuidGenerator;
        this.hashType = hashGenerator;
        this.compareType = compareBcrypt;
        this.jwtTypes = jsonGenerator;
    }

    async register(user: UserRegisterDto): Promise<number> {
        try {

            let { email, name, password, phone } = user;

            const sheach = await UserEntity.findOne({
                where: [
                    { email: Like(email) },
                    { phone: Like(phone) },
                ],
            });
            if (sheach) throw Error('user exists already');

            const userId = this.uuid()
            password = this.hashType(password);
            const createuser = UserEntity.create({
                email,
                name,
                password,
                phone,
                userId
            });
            await createuser.save();

            return 1

        } catch (error) {

            console.error(error);
            return 0;

        }
    }

    async login(payload: UserLoginDto): Promise<ReturnUserLoged> {

        try {
            let { email, phone, password } = payload;

            const sheach = await UserEntity.findOne({
                where: [
                    { email: Like(email) },
                    { phone: Like(phone) },
                ],
            });

            if (!sheach) throw Error('not exist a user');

            const ValidatePassword = this.compareType(password, sheach.password!);
            if (!ValidatePassword) throw Error('password incorrect');
            const token = this.jwtTypes(payload);

            delete sheach.password

            return { user: sheach, token };

        } catch (error) {

            console.error(error);
            return { error: error };

        }

    }

    async getUsers(userId: string): Promise<UserEntity[]> {
        try {

            const users = await UserEntity.find({
                where: {
                    userId: Not(userId)
                },
                select: ['userId', 'active', 'avatar', 'createAt', 'email', 'id', 'phone', 'updatedAt', 'name']
            })

            return users;

        } catch (error) {
            console.log(error)
            return []
        }
    }

    async perfil(userId: string): Promise<UserEntity | {}> {
        try {
            const user = await UserEntity.findOne({ where: { userId: userId } });
            if (!user) throw Error("ocurrio un error ");
            return user;
        } catch (error) {
            console.error(error)
            return {}
        }
    }

    async notification(userId: string): Promise< MessageEntity[]> {
        try {
            const allMessage = await MessageEntity.find({
                where: [
                    { receiver: userId },
                ]
            })
            if (allMessage.length === 0) throw Error("not new message") ;
            const data = allMessage.filter(message => message.status === "1")
            if (data.length === 0) return [];

            return data;
        } catch (error) {
            console.error(error);
            return [];
        }

    }

    async receivedMessage(userId: string, status: string): Promise<string> {
        try {

            const allMessage = await MessageEntity.find({
                where: [
                    { receiver: userId },
                ]
            })

            allMessage.forEach(async (message) => {

                if (message.status === "0") {
                    message.status = status;
                    await message.save();
                }

                if (message.status === "1") {
                    message.status = status;
                    await message.save();
                }

            })

            return "ok";

        } catch (error) {

            console.error(error);
            return "failed";

        }

    }

    async vistoMessage(userId: string, contactId: string): Promise<MessageEntity[]> {
        try {
            const allMessage = await MessageEntity.find({
                where: [
                    { receiver: userId },
                ]
            })

            allMessage.forEach(async(message)=>{
                 if(message.sender === contactId){
                    message.status = "2"
                    await message.save();
                 }
            })

            const data = allMessage.filter(message => message.status === "1");

            return data

        } catch (error) {
           console.error(error)
           return []
        }
    }

    async ediPerfil(user:UserEntity): Promise< string > {
        try {
            const {name,email,phone,userId} = user;
            const existingUser = await UserEntity.findOne({where:{ userId }});

            // Verificar si el usuario existe
            if (existingUser) {
                // Actualizar solo los campos proporcionados
                if (name !== undefined) {
                    existingUser.name = name;
                }
    
                if (email !== undefined) {
                    existingUser.email = email;
                }
    
                if (phone !== undefined) {
                    existingUser.phone = phone;
                }
    
                await existingUser.save();
    
                return 'Perfil actualizado exitosamente';
            } else {
                return 'Usuario no encontrado';
            }
        } catch (error) {
            console.error(error);
            return 'ocuarrio un error';
        }

    }

}