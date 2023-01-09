import React from 'react';
import { useState, useEffect } from 'react';
import {Game as GameType} from 'phaser';

function Game_Platform() {
   
    const [game, setGame] = useState<GameType>();
    useEffect(()=>{
        async function initPhaser(){
            const Phaser = await import('phaser');
            const {default: GridEngine} = await import('grid-engine');

            //import scenes here
            const {default: preloader_scene } = await import('../game_1/scenes/preloader_scene');
            const {default: testgame_scene } = await import('../game_1/scenes/testgame_scene');

            //game configuration and settings
            const config = {
                type: Phaser.AUTO,
                title: 'xxx-game',
                parent: 'game-content', // correspond to the id of div down below,
                width: 2000,
                height: 2000,
                pixelArt: true,
                // scale:{
                //     autoCenter : Phaser.Scale.CENTER_BOTH
                // },
                scene:[
                    //scenes are loaded from game_x/scenes
                    preloader_scene,
                    testgame_scene
                ],
                // physics:{
                //     default: 'arcade',
                //     arcade:{
                //         gravity:{y:0}
                //     }
                // },
                // plugins:{
                //     scene: [
                //         {
                //           key: "gridEngine",
                //           plugin: GridEngine,
                //           mapping: "gridEngine",
                //         },
                //       ],
                // },
                backgroundColor: '#1c1c1c'
               
            };

            //set game using the config
            const phaserGame = new Phaser.Game(config);
            setGame(phaserGame);

        }

        //run the function above
        initPhaser();

    },[]) // the [] is added to ensure the code is only run once (on production but not dev)
          // so, change the react strict mode to false in next.config.js

    

    return (
    <div id="game-content" key= "game-content">
        {}
    </div>
    );
};

export default Game_Platform;