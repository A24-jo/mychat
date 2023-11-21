import { DataSource } from "typeorm";
import {config} from 'dotenv';

config()


export const AppDataSource = new DataSource({
    type:'mysql',
    host: process.env.MYSQL_HOST ,
    username: process.env.MYSQL_USERNAME ,
    password: process.env.MYSQL_PASSWORD ,
    port: +process.env.MYSQL_PORT!,
    database: process.env.MYSQL_DATABASE ,
    entities:["src/entities/*.ts"],
    logging:false,
    synchronize:true,
});