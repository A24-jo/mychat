"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, {
    cors: { origin: 'http://localhost:3000', methods: ['get', 'post'] },
});
io.on('connection', (socket) => {
    socket.on("join_room", ({ userId }) => {
        console.log(userId, "dentro de join");
        socket.join(userId);
    });
    socket.on("send_message", (message) => {
        console.log(message, "ESTE ES EL message");
        io.to(message.receiver).emit("new_message", message);
    });
});
exports.default = server;
