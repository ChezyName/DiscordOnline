import { Socket } from "socket.io";

export default class SocketHandler {
    username:string;
    socket:Socket;
    currentAudioStream:any;
    Interval:any;
    others:SocketHandler[];

    constructor(Socket:Socket,Username:string,OnDiscconnect:any,otherUsers:SocketHandler[]){
        console.log("User: " + Username + " Has Connected!")
        this.username = Username;
        this.socket = Socket;

        this.socket.emit("con");
        this.socket.on('disconnect',() => {OnDiscconnect(this)});
        this.socket.on('audio',(stream) => {
            var newData = stream.split(";");
            newData[0] = "data:audio/ogg;";
            newData = newData[0] + newData[1];
            this.socket.emit('audio',newData);
        });
        this.others = otherUsers;
    }
}