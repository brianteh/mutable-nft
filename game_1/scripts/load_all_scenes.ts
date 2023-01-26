
async function loadAllScenes(){
    //import scenes here
    const {default :preloader_scene} = await import('../scenes/preloader_scene.js')
    const {default :testgame_scene} = await import('../scenes/testgame_scene.js')
    const {default : gridengine_scene} = await import('../scenes/gridengine_scene')
    const {default : testsocket_scene} = await import('../scenes/testsocket_scene')

    const scenes = [
        // preloader_scene,
        // testgame_scene,
        // gridengine_scene,
        testsocket_scene
    ];

    return scenes
}

export const allScenes = loadAllScenes()