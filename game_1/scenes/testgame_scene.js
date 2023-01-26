import { Scene } from 'phaser';

//import functions here from /scripts
//import {foo1} from '../scripts/fetch_functions'
//import {foo2} from '../scripts/fetch_functions';

export default class testgame_scene extends Scene{

    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors

    /** @type {Phaser.Physics.Arcade.Sprite} */
    player

    /** @type {Phaser.Physics.Arcade.StaticGroup} */
    boxGroup

    //list the plugins or engines here
    //gridEngine // just call the variable by writing this.engine_x

    constructor(){
        super('testgame');
    }

    init(){
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    preload(){
        //foo1("haha")// calling test function 
        //foo2()//calling async test function that feteches data
        /*this.load.image('animal1','animations/cow.png');
        this.load.image('background_1', 'backgrounds/background_1.png');*/
    }
    create(){
        /*this.add.image(400,300,'animal1');
        this.add.image(0,0,'background_1');
        this.scene.start("gridengine");*/
        const { width, height } = this.scale
        this.player = this.physics.add.sprite(width * 0.5, height * 0.6, 'sokoban')
            .setSize(40, 16)
            .setOffset(12, 38)
            .play('down-idle')
        
        this.boxGroup = this.physics.add.staticGroup()

        this.createBoxes()
        this.physics.add.collider(this.player, this.boxGroup)
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
                    .setOffset(0,32)
                xPer += 0.25
            }
            xPer = 0.25
            y += 150
        }

    }

    update(){
        const speed = 200

        if (this.cursors.left.isDown){
            this.player.setVelocity(-1*speed,0)
            this.player.play('left-walk',true)
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocity(1*speed,0)
            this.player.play('right-walk',true)
        }
        else if (this.cursors.up.isDown){
            this.player.setVelocity(0,-1*speed)
            this.player.play('up-walk',true)
        }
        else if (this.cursors.down.isDown){
            this.player.setVelocity(0,1*speed)
            this.player.play('down-walk',true)
        }

        else{
            this.player.setVelocity(0,0)
            const key = this.player.anims.currentAnim.key
            const parts = key.split('-')
            const direction = parts[0]
            this.player.play('${direction}-idle')
        }

        this.children.each(c =>{
            /** @type {Phaser.Physics.Arcade.Sprite} */
            // @ts-ignore
            const child = c

            child.setDepth(child.y)

        })

    }
}