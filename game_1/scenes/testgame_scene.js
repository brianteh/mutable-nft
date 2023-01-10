import { Scene } from 'phaser';

//import functions here from /scripts
import {foo1} from '../scripts/fetch_functions'
import {foo2} from '../scripts/fetch_functions';

export default class testgame_scene extends Scene{

    //list the plugins or engines here
    gridEngine // just call the variable by writing this.engine_x

    constructor(){
        super('testgame');
    }
    preload(){
        foo1("haha")// calling test function 
        foo2()//calling async test function that feteches data
        this.load.image('animal1','animations/cow.png');
        this.load.image('background_1', 'backgrounds/background_1.png');
    }
    create(){
        this.add.image(400,300,'animal1');
        this.add.image(0,0,'background_1');

    }
    update(){
        
    }
}