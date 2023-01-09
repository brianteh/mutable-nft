import { Scene } from 'phaser';

export default class preloader_scene extends Scene{
    constructor(){
        super('preloader');
    }
    preload(){
        
    }
    create(){
        this.scene.start('testgame');

    }
}