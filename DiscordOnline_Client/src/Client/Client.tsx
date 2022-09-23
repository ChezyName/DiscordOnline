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
        this.socket = io("http://"+ IP +":7777");
        this.socket.emit("name",NAME);
        this.socket.on('con',() => { this.connected = true; });
        this.Interval = setInterval(this.sendMicrophoneInput.bind(this),250);
        this.socket.on('audio',(buffer:any) => {this.playWebAudio(buffer)});
        this.audio = document.createElement('audio');
    }

    playWebAudio(arrayBuffer:any){
        //console.log(arrayBuffer);
        var blob = new Blob([arrayBuffer], { 'type' : 'audio/ogg; codecs=opus' });
        this.audio.src = window.URL.createObjectURL(blob);
        this.audio.play();
    }

    async sendMicrophoneInput(){
        if(!this.socket) return;

        let stream = null;
        try {
            stream = await navigator.mediaDevices.getUserMedia({audio: true});
            let recorder = new MediaRecorder(stream);
            if(recorder.state === "recording"){
                setTimeout(() => {recorder.stop();},500);
            }
            else{
                recorder.start(500);
                recorder.addEventListener('dataavailable', (async event => {
                    if (typeof event.data === 'undefined') return;
                    if (event.data.size === 0) return;   
                    let c = [event.data];
                    event.data.arrayBuffer().then(buffer => {
                        this.socket.emit('audio',new Blob(c, { 'type' : 'audio/ogg; codecs=opus' }));
                    });  
                }));
            }

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