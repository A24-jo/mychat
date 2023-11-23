import { DataSource } from "typeorm";
import {config} from 'dotenv';
import { MessageEntity } from "./entities/message.entity";
import { UserEntity } from "./entities/user.entity";

config()


export const AppDataSource = new DataSource({
    type:'mysql',
    host: process.env.MYSQL_HOST ,
    username: process.env.MYSQL_USERNAME ,
    password: process.env.MYSQL_PASSWORD ,
    port: +process.env.MYSQL_PORT!,
    database: process.env.MYSQL_DATABASE ,
    entities:[MessageEntity,UserEntity],
    logging:true,
    synchronize:true,
    ssl: {
        rejectUnauthorized: true,
    },
});