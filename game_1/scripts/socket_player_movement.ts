import {type Socket} from 'socket.io-client'

type user_id = string
type movement_all_player_data = {
    direction: string,
    user_id: string
}


export function emit_movement_self_player(socket: Socket, direction: string, user_id: user_id ){
    socket.emit("movement_self_player",{direction:direction,user_id:user_id})
}

export function receive_movement_all_player(socket: Socket, direction: string, user_id: user_id){
    socket.on('movement_all_player',(data:movement_all_player_data)=>{
        return {direction:data.direction, user_id: data.user_id}
    })
}


