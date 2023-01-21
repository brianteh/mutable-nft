import { Scene } from 'phaser';

//import functions here from /scripts
import {foo1} from '../scripts/fetch_functions'
import {foo2} from '../scripts/fetch_functions';

export default class testgame_scene extends Scene{

    //list the plugins or engines here
    gridEngine // just call the variable by writing this.engine_x

    constructor(){
        super('gridengine');
    }
    preload(){
       
        //testing
       /*this.load.spritesheet("player", "/sprites/player.png",{
        frameWidth: 200,
        frameHeight: 200
        //this.load.spritesheet('sokoban','tiles/sokoban_tilesheet.png',)
            //frameWidth: 64
       });*/

       /*this.load.image("tile_1", "/tiles/tile_1.png");
       console.log("load success");*/
       
    }
    create(){

        //testing
        /*const playerSprite = this.physics.add.sprite(0,0,"player")

        const gridEngineConfig = {
            characters: [
              {
                id: "player",
                sprite: playerSprite
              },
            ],
        };

        //make a multi-dimensonial array
        const array=[
            [0,1,2,22],
            [17,18,19],
            [34,35,36]
        ];

        //make the tile map           
        const map = this.make.tilemap({ data:array, tileWidth: 64, tileHeight: 64});

        //add the tileset to the map
        map.addTilesetImage("tile_1");

        map.layers.forEach((layer,index)=>{
            map.createLayer(index,"tile_1",0,0)
        });

        this.gridEngine.create(map, gridEngineConfig);*/
        

    }
    update(){
        
    }
}