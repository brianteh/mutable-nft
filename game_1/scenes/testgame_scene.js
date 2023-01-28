import { Scene } from 'phaser';
import { DEFAULT } from '../scripts/default_game_variables';

//import functions here from /scripts
//import {foo1} from '../scripts/fetch_functions'
//import {foo2} from '../scripts/fetch_functions';
import { socket_interface, user_socket_interface } from '../scripts/socket_functions';
import { emit_movement_self_player, receive_movement_all_player } from '../scripts/socket_player_movement';

export default class testgame_scene extends Scene{
    
    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors

    /** @type {Phaser.Physics.Arcade.Sprite} */
    player
    

    /** @type {Phaser.Physics.Arcade.StaticGroup} */
    boxGroup

    //list the plugins or engines here
    //gridEngine // just call the variable by writing this.engine_x

    // Initial attribute config
    speed

    // Connection config
    user_socket_interface

    player_object_list
    player_data_list

    user_id
    other_user_ids
    user_socket

    constructor(){
        super('testgame');
        this.player_data_list=[]
        this.player_object_list=[]
        this.other_user_ids=[]
    }

    init(){
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    preload(){

        const { width, height } = this.scale

        this.player = this.physics.add.sprite(width * 0.5, height * 0.6, 'sokoban')
            .setSize(40, 16)
            .setOffset(12, 38)
            .play('down-idle')
        
    }
    async create(){

        const {io} = await import('socket.io-client')
        
        this.user_socket_interface = new socket_interface(io,this.physics,this.scale,process.env.socket_api_key)
        this.user_socket_interface.run()

        
        this.speed = 5 // load from nft

        this.boxGroup = this.physics.add.staticGroup()
        this.createBoxes()
        
        // this.physics.add.collider(this.player, this.boxGroup)
          
    }

    createBoxes(){
        const width = this.scale.width
        let xPer = 0.25
        let y = 150
        for (let row = 0; row < 3; ++row){
            for (let col = 0; col < 3; ++col){
                /** @type {Phaser.Physics.Arcade.Sprite} */
                const box = this.boxGroup.get(width * xPer, y, 'sokoban', 10)
                box.setSize(64,32)
                    .setOffset(0,32)// this.boxGroup.getChildren()[index].body.offset ==> to get the value of offset for each collision box
                xPer += 0.25
            }
            xPer = 0.25
            y += 150
        }

    }

    update(){
        let speed = this.speed
        let box_collision_left
        let box_collision_right
        let box_collision_up
        let box_collision_down

        // Debugging
        document.getElementById("x").innerHTML = "player_x:"+this.player.x;
        document.getElementById("y").innerHTML = "player_y:"+this.player.y;
        document.getElementById("mouse_x").innerHTML = "mouse_x:"+this.input.activePointer.x;
        document.getElementById("mouse_y").innerHTML = "mouse_y:"+this.input.activePointer.y;
        
            
        function no_box_collision(){
            box_collision_down=false;
            box_collision_up=false;
            box_collision_right=false;
            box_collision_left=false;
        }

        // Handling collision 
        // Example : player & box
        this.physics.collide(this.player,this.boxGroup,(object1,object2)=>{
            let player = object1
            let box = object2
            if(box.x-32>player.x){
               box_collision_right=true
            }
            if(box.y-16>player.y){
                box_collision_down=true
            }
            if(box.x+32<player.x){
                box_collision_left=true
            }
            if(box.y+16<player.y){
                box_collision_up=true
            }
        })? null 
        :no_box_collision()
           





        // Controls
        if (this.cursors.left.isDown && !box_collision_left){
           
            this.player.setX(this.player.x-speed)
            // this.player.setVelocity(-1*speed,0)
            this.player.play('left-walk',true)

            emit_movement_self_player(this.user_socket_interface?.user_socket,this.player.x,this.player.y)
        }
        else if (this.cursors.right.isDown && !box_collision_right){
            
            this.player.setX(this.player.x+speed)
            // this.player.setVelocity(1*speed,0)
            this.player.play('right-walk',true)

            emit_movement_self_player(this.user_socket_interface?.user_socket,this.player.x,this.player.y)
        }
        else if (this.cursors.up.isDown && !box_collision_up){
            
            this.player.setY(this.player.y-speed)
            // this.player.setVelocity(0,-1*speed)
            this.player.play('up-walk',true)

            emit_movement_self_player(this.user_socket_interface?.user_socket,this.player.x,this.player.y)
        }
        else if (this.cursors.down.isDown && !box_collision_down){
            
            this.player.setY(this.player.y+speed)
            // this.player.setVelocity(0,1*speed)
            this.player.play('down-walk',true)

            emit_movement_self_player(this.user_socket_interface?.user_socket,this.player.x,this.player.y)
        }

        else{
            this.player.setVelocity(0,0)
            const key = this.player.anims.currentAnim.key
            const parts = key.split('-')
            const direction = parts[0]
            this.player.play(`${direction}-idle`)
        }

        this.children.each(c =>{
            /** @type {Phaser.Physics.Arcade.Sprite} */
            // @ts-ignore
            const child = c

            child.setDepth(child.y)

        })


         // Socket update
         this.player_data_list = this.user_socket_interface?.player_data_list
         this.player_object_list = this.user_socket_interface?.player_object_list//tips: xxx?.attr to prevent undefined typeError
         this.other_user_ids = this.user_socket_interface?.other_user_ids

 
       
        
    }
}