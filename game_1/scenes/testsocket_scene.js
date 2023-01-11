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
    create(){
        document.getElementById("dashboard").innerHTML="HOHO";// it works
   
        document.getElementById("logout").innerText="Log out";
        

    }
    update(){
        // document.getElementById("logout").onclick=()=>{
        //     this.socket.emit()
        // }
    }
}