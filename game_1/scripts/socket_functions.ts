import { Socket } from "socket.io-client";
import { Physics, Scale, Scene } from 'phaser';


interface socketInterface{
    other_user_ids: string[],
    player_object_list: any[],
    player_data_list: any[],
    user_socket: Socket
}

export class socket_interface implements socketInterface{
  
    other_user_ids: string[]
    player_object_list: any[]
    player_data_list: any[]
    user_socket: Socket
    physics: Physics.Arcade.ArcadePhysics
    scale: Scale.ScaleManager
   
    constructor(io:any,_physics: Physics.Arcade.ArcadePhysics, _scale: Scale.ScaleManager, api: string){
        
        this.user_socket = io('http://localhost:3001/user')
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

            if(this.other_user_ids.length==0) this.user_socket.emit("req_load_prev_player");
    
        })
    
        this.user_socket.on('load_prev_player',(data)=>{
           
            let prev_player_id_list = data.all_player.filter((e:any)=>{return e!=this.user_socket.id})
            let prev_player_pos_list = data.all_player_property.all_player_pos.filter((e:any)=>{return e!=this.user_socket.id})
            let prev_player_attr_list = data.all_player_property.all_player_attribute.filter((e:any)=>{return e!=this.user_socket.id})

            for(let i = 0; i < prev_player_id_list.length; i++ ){
    
                let player_id = prev_player_id_list[i]
                let player_pos = prev_player_pos_list.filter((e:any)=>{return e.player_id == player_id})[0]
                let player_attr = prev_player_attr_list.filter((e:any)=>{return e.player_id == player_id})[0]
                let player_property = {pos:{x:player_pos.x,y:player_pos.y},attribute:player_attr}
                
                this.player_data_list.push({player_id:player_id,player_property:player_property})
    
                let player_object=this.physics.add.sprite(this.scale.width * 0.5, this.scale.height * 0.6, 'sokoban')
                    .setSize(40, 16)
                    .setOffset(12, 38)
                    .play('down-idle')
                    .setX(player_property.pos.x)// load from game state
                    .setY(player_property.pos.y)
                
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
                .setX(player_property.pos.x)// load at origin
                .setY(player_property.pos.y)
    
            this.player_object_list.push({player_id:player_id,player_object:player_object})
            this.other_user_ids.push(player_id)
    
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
          
        })

        this.user_socket.on('movement_all_player',(data)=>{
           
            if(this.user_socket.id != data.user_id && this.player_object_list.length > 0){
    
                let _index = this.player_object_list.findIndex((e)=>{return e.player_id == data.user_id})
    
                //console.log({user_id: data.user_id,user_x:data.user_x,user_y:data.user_y})
                
                this.player_object_list[_index].player_object.x = data.user_x
                this.player_object_list[_index].player_object.y = data.user_y
                
                
            }
        })



    }
    
}



