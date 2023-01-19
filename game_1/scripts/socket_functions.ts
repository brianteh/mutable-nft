import { type Socket } from "socket.io-client";

type data_type={
    user_id: string
}

export function user_socket_interface(user_socket:Socket,user_id:string,other_user_ids: string[]){

    user_socket.on('connect',()=>{
        user_id = user_socket.id;
    })

    user_socket.on('new_player',(data:data_type)=>{
        other_user_ids.push(data.user_id)
        alert(`Current other players in room: ${other_user_ids}`)
    })

    user_socket.on('player_leaving',(data:data_type)=>{
        other_user_ids = other_user_ids.filter((e)=>{
            return e != data.user_id
        })
        alert(`Current other players in room: ${other_user_ids}`)
      
    })
}

