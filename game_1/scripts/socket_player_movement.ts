import {type Socket} from 'socket.io-client'
import {Physics, Scene} from 'phaser';


export function emit_movement_self_player(user_socket: Socket, x: number, y: number, ){
    user_socket.emit("movement_self_player",{user_id:user_socket.id,user_x:x,user_y:y})
}





