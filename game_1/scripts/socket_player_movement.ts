import {type Socket} from 'socket.io-client'
import {Physics, Scene} from 'phaser';

type user_id = string

type movement_all_player_data = {
    user_id: string,
    user_x: number,
    user_y: number
}


export function emit_movement_self_player(user_socket: Socket, user_id: user_id, x:number, y:number ){
    user_socket.emit("movement_self_player",{user_id:user_socket.id,user_x:x,user_y:y})
}

export function receive_movement_all_player(user_socket: Socket,user_id: user_id, other_user_ids: string[], physics: Physics.Arcade.ArcadePhysics,player_object_list: any[]){
    user_socket.on('movement_all_player',(data:movement_all_player_data)=>{
        console.log(player_object_list,2)
        console.log(other_user_ids,2)
        if(user_socket.id != data.user_id && player_object_list.length > 0){

            let _index = player_object_list.findIndex((e)=>{return e.player_id == data.user_id})

            console.log({user_id: data.user_id,user_x:data.user_x,user_y:data.user_y})
            
            player_object_list[_index].player_object.x = data.user_x
            player_object_list[_index].player_object.y = data.user_y
            
            
        }
    })
}


