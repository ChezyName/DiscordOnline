const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
import { Socket } from 'socket.io';
import SocketHandler from './socketHandler';

const Users:SocketHandler[] = [];
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 7777;


let app = express();
let server = http.createServer(app);
let io = socketIO(server, {
    cors: {
      origin: '*',
    }
});

app.use(express.static(publicPath));

server.listen(port, ()=> {
    console.log(`Server is up on port ${port}.`)
});


io.on('connection', (socket:Socket) => {
    function OnDiscconnect(client:SocketHandler){
        console.log("User:" + client.username + " Has Disconnected!");
        let i =Users.indexOf(client)
        if(i > -1){
            Users.splice(i,1);
        }
    }

    socket.on("name", (name) => {
        let client:SocketHandler = new SocketHandler(socket,name,OnDiscconnect);
        Users.push(client);
    });
});