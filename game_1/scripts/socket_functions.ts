import { Socket } from "socket.io-client";
import { Physics, Scale, Scene } from 'phaser';
import { DefaultEventsMap } from "@socket.io/component-emitter";

type movement_all_player_data = {
    user_id: string,
    user_x: number,
    user_y: number
}

type user_property_data_type={
    walking_speed: number,
    jumping_power: number
}

type data_type={
    user_id: string,
    user_property: user_property_data_type,

}

interface socketInterface{
    user_id: string,
    other_user_ids: string[]
    player_object_list: any[],
    player_data_list: any[],
    user_socket: Socket
}

export class socket_interface implements socketInterface{
  
    user_id: string
    other_user_ids: string[]
    player_object_list: any[]
    player_data_list: any[]
    user_socket: Socket
    physics: Physics.Arcade.ArcadePhysics
    scale: Scale.ScaleManager
   
    constructor(io:any,_physics: Physics.Arcade.ArcadePhysics, _scale: Scale.ScaleManager){
        
        this.user_socket = io('http://localhost:3001/user')
        this.user_id = this.user_socket.id
        this.other_user_ids=[]
        this.player_data_list=[]
        this.player_object_list=[]
        this.physics = _physics
        this.scale = _scale
    }
    
    get get_player_data_list(): any{
        return this.player_data_list
    }
    get get_player_object_list(): any{
        return this.player_object_list
    }
    get get_other_user_ids(): any{
        return this.other_user_ids
    }

    run(){

        this.user_socket.on('connect',()=>{

            this.user_id = this.user_socket.id;
            console.log(this.user_id)
            if(this.other_user_ids.length==0) this.user_socket.emit("req_load_prev_player");
    
        })
    
        this.user_socket.on('load_prev_player',(data)=>{
           
            let prev_player_list = data.all_player.filter((e:any)=>{return e!=this.user_socket.id})
    
            for(let i = 0; i < prev_player_list.length; i++ ){
    
                let player_id = prev_player_list[i]
                let player_property = data.user_property
                
                this.player_data_list.push({player_id:player_id,player_property:player_property})
    
                let player_object=this.physics.add.sprite(this.scale.width * 0.5, this.scale.height * 0.6, 'sokoban')
                    .setSize(40, 16)
                    .setOffset(12, 38)
                    .play('down-idle')
                    .setX((this.other_user_ids.length+1)*200)
                    .setY((this.other_user_ids.length+1)*200)
                
                this.player_object_list.push({player_id:player_id,player_object:player_object})
                this.other_user_ids.push(player_id)
    
            }
        })
    
        this.user_socket.on('new_player',(data)=>{
    
            let player_id = data.user_id
            let player_property = data.user_property
            
            this.player_data_list.push({player_id:player_id,player_property:player_property})
    
            let player_object=this.physics.add.sprite(this.scale.width * 0.5, this.scale.height * 0.6, 'sokoban')
                .setSize(40, 16)
                .setOffset(12, 38)
                .play('down-idle')
                .setX((this.other_user_ids.length+1)*200)
                .setY((this.other_user_ids.length+1)*200)
    
            this.player_object_list.push({player_id:player_id,player_object:player_object})
            this.other_user_ids.push(player_id)
    
            // console.log("new player")
        })
    
        this.user_socket.on('player_leaving',(data)=>{
    
            let _index = this.player_object_list.findIndex((e)=>{return e.player_id == data.user_id})
    
            this.other_user_ids = this.other_user_ids.filter((e)=>{
                return e != data.user_id
            })
    
            this.player_object_list[_index].player_object.destroy(true)
            this.player_object_list[_index].player_object = null
          
            this.player_object_list = this.player_object_list.filter((e)=>{
                return e.player_id != data.user_id
            })
            this.player_data_list = this.player_data_list.filter((e)=>{
                return e.player_id != data.user_id
            })
    
            // console.log(this.player_object_list,1)
            // console.log(this.other_user_ids,1)
          
        })

        this.user_socket.on('movement_all_player',(data)=>{
            // console.log(this.player_object_list,2)
            // console.log(this.other_user_ids,2)
            if(this.user_socket.id != data.user_id && this.player_object_list.length > 0){
    
                let _index = this.player_object_list.findIndex((e)=>{return e.player_id == data.user_id})
    
                // console.log({user_id: data.user_id,user_x:data.user_x,user_y:data.user_y})
                
                this.player_object_list[_index].player_object.x = data.user_x
                this.player_object_list[_index].player_object.y = data.user_y
                
                
            }
        })



    }
    
}



