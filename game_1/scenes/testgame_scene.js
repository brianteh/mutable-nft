import { Scene } from 'phaser';

export default class testgame_scene extends Scene{
    constructor(){
        super('testgame');
    }
    preload(){
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