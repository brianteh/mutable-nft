// to have multiple games on the same domain, this page can be duplicated
//the only change needed is the imported scenes

import { useState, useEffect } from 'react';
import {Game as GameType} from 'phaser';
import { allScenes } from '../game_1/scripts/load_all_scenes';



function Game_Platform() {
   
    const [game, setGame] = useState<GameType>();

    useEffect(()=>{
        async function initPhaser(){
            /*Start of the configuration settings*/

            const Phaser = await import('phaser');
            const haha = "cococ";
            //import engines here
            const {default: GridEngine} = await import('grid-engine');

            //game configuration and settings
            const config ={
        
                type: Phaser.AUTO,
                title: 'xxx-game',
                parent: 'game-content', // correspond to the id of div down below,
                width: 2000,
                height: 2000,
                pixelArt: true,
        
                // scale:{
                //     autoCenter : Phaser.Scale.CENTER_BOTH
                // },
        
                scene: await allScenes, //scenes are loaded from game_x/scenes
                
                physics:{
                    default: 'arcade',
                    arcade:{
                        gravity:{y:0}
                    }
                },
        
                plugins:{
                    scene: [
                        {
                            key: "gridEngine",
                            plugin: GridEngine,
                            mapping: "gridEngine",
                        },

                      ],
                },
        
                backgroundColor: '#1c1c1c',
                
               

                
            }
            /*End of the configuration settings*/

            //set game using the config
            const phaserGame = new Phaser.Game(config);
            setGame(phaserGame);

        }

        //run the function above
        initPhaser();
       

    },[]) // the [] is added to ensure the code is only run once (on production but not dev)
          // so, change the react strict mode to false in next.config.js

    

    return (<>
    <div id="game-content" key= "game-content">
        {/*the game canvas is rendered here */}
    </div>
    </>
    );
};

export default Game_Platform;