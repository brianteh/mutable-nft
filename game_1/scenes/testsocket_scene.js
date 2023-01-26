import { Scene } from 'phaser';

//import functions here from /scripts
import {foo1} from '../scripts/fetch_functions';
import {foo2} from '../scripts/fetch_functions';
import { user_socket_interface } from '../scripts/socket_functions';


export default class testgame_scene extends Scene{
    
    //list the plugins or engines here
    gridEngine // just call the variable by writing this.engine_x

    constructor(){
        super('testsocket');

    }

    preload(){
        
    }
    async create(){

        const {io} = await import('socket.io-client')
        const user_socket = io('http://localhost:3001/user')
        let user_id;
        let other_user_ids=[];
        
        user_socket_interface(user_socket,user_id,other_user_ids)

    }
    update(){

    }
    
}
