import { Socket } from "socket.io";

export default class SocketHandler {
    username:string;
    socket:Socket;

    constructor(Socket:Socket,Username:string,OnDiscconnect:any){
        console.log("User: " + Username + " Has Connected!")
        this.username = Username;
        this.socket = Socket;

        this.socket.on('disconnect',() => {OnDiscconnect(this)});
    }
}