
async function loadAllScenes(){
    //import scenes here
    const {default :preloader_scene} = await import("../scenes/preloader_scene.js")
    const {default :testgame_scene} = await import("../scenes/testgame_scene.js")

    const scenes = [
        preloader_scene,
        testgame_scene
    ];

    return scenes
}

export const allScenes = loadAllScenes()