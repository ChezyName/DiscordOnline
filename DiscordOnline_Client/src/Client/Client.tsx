import { io, Socket } from "socket.io-client"
class ClientHandler {
    socket:Socket;
    constructor(IP:string,NAME:String){
        this.socket = io("http://"+ IP +":7777");
        this.socket.emit("name",NAME);
    }
}

export default ClientHandler;