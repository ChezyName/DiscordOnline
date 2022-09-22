class SocketHandler {
    constructor(Socket,Username,OnDiscconnect){
        console.log("User: " + Username + " Has Connected!")
        this.username = Username;
        this.socket = Socket;

        this.socket.on('disconnect',() => {OnDiscconnect(this)});
    }
}

module.exports = {SocketHandler};