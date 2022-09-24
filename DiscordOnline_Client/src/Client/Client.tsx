import { startTransition } from "react";
import { io, Socket } from "socket.io-client"

function encodeAudio(stream:any){

}

class ClientHandler {
    socket:Socket;
    connected:boolean = false;
    Interval:number;
    audio:any;
    constructor(IP:string,NAME:String){
        this.socket = io("ws://"+ IP +":7777");
        this.socket.emit("name",NAME);
        this.socket.on('con',() => { this.connected = true; });
        this.Interval = setInterval(this.sendMicrophoneInput.bind(this),250);
        this.socket.on('audio',(buffer:any) => {this.playWebAudio(buffer)});
        this.audio = document.createElement('audio');
    }

    playWebAudio(arrayBuffer:any){
        //console.log(arrayBuffer);
        //var blob = new Blob([arrayBuffer], { 'type' : 'audio/ogg; codecs=opus' });
        //console.log(arrayBuffer);
        let a = new Audio(arrayBuffer);
        a.play();
    }

    async sendMicrophoneInput(){
        if(!this.socket) return;

        let time = 1000;
        let socket = this.socket;
        try {
            navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
                var madiaRecorder = new MediaRecorder(stream);
                madiaRecorder.start();
            
                var audioChunks:any[] = [];
            
                madiaRecorder.addEventListener("dataavailable", function (event) {
                  audioChunks.push(event.data);
                });
            
                madiaRecorder.addEventListener("stop", function () {
                  var audioBlob = new Blob(audioChunks);
            
                  audioChunks = [];
            
                  var fileReader = new FileReader();
                  fileReader.readAsDataURL(audioBlob);
                  fileReader.onloadend = function () {
                    //if (!userStatus.microphone || !userStatus.online) return;
            
                    var base64String = fileReader.result;
                    socket.emit("audio", base64String);
            
                  };
            
                  madiaRecorder.start();
            
            
                  setTimeout(function () {
                    madiaRecorder.stop();
                  }, time);
                });
            
                setTimeout(function () {
                  madiaRecorder.stop();
                }, time);
              });

            /*
            this.socket.emit("audio",stream);
            let aCTX = new AudioContext();
            let mic = aCTX.createMediaStreamSource(stream);
            mic.connect(aCTX.destination);
            */
        } catch(err:any) {
            document.write(err)
        }
    }
}

export default ClientHandler;