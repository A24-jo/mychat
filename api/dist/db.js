"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const message_entity_1 = require("./entities/message.entity");
const user_entity_1 = require("./entities/user.entity");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    port: +process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    entities: [message_entity_1.MessageEntity, user_entity_1.UserEntity],
    logging: true,
    synchronize: true,
    ssl: {
        rejectUnauthorized: true,
    },
});
