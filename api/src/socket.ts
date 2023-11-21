import http from 'http';
import {Server as SocketServer} from 'socket.io';
import app from './app';

const server = http.createServer(app);
const io = new SocketServer(server,{
    cors:{origin:'http://localhost:3000',methods:['get', 'post']},
});


io.on('connection',(socket)=>{
   
    socket.on("join_room",({userId}:{userId:string})=>{
      console.log(userId,"dentro de join")
      socket.join(userId)
    })

    socket.on("send_message",(message)=>{
      console.log(message,"ESTE ES EL message")
      io.to(message.receiver).emit("new_message",message)
    })

});

export default server;