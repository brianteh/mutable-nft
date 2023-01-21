import { Scene } from 'phaser';

//import functions here from /scripts
import {foo1} from '../scripts/fetch_functions';
import {foo2} from '../scripts/fetch_functions';


export default class testgame_scene extends Scene{
    
    //list the plugins or engines here
    gridEngine // just call the variable by writing this.engine_x
    socket

    constructor(){
        super('testsocket');

    }

    preload(){
        
    }
    async create(){

        const {io} = await import('socket.io-client')
        const main_socket = io('http://localhost:3001')
        const room_socket = io('http://localhost:3001/user')

        document.getElementById("dashboard").innerHTML="HOHO";// it works
   
        document.getElementById("logout").innerText="Log out";
        
        document.getElementById("logout").onclick=()=>{
            main_socket.emit("send_message",{message:"Hello"})
        }
        main_socket.on("receive_message",(data)=>{
            alert(data.message)
        })
        room_socket.emit()
    

    }
    update(){

    }
    
}