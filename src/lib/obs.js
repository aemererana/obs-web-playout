
import OBSWebSocket from 'obs-websocket-js';
// import store from './../config/reduxStore';

// console.log(store.dispatch);

export const obs = new OBSWebSocket();

/**
 * --------------------------------------------------- CALLBACKS ------------------------------------------------------
 */

/**
 * Send OBS to stop all media players
 * 
 * @param sceneName     name of the playout scene
 * @param playersArr    indexed OBS source names of media players
 */
export const obsStopMediaPlayback = (sceneName, playersArr) => {
    for(const v of playersArr) {
        // stop media from playing
        obs.send("StopMedia", {
            "sourceName": v,
        });

        // set the visibility of the source name
        obs.send("SetSceneItemProperties", {
            "scene-name": sceneName,
            item: v,
            visible: false,
        });
    }

    //obsSetScene(sceneName);
};


export const obsSetPlayerVisibility = (sceneName, playerSource, bVisible) => {
    console.log("DEBUG: CALLED TO CHANGE VISIBILITY", sceneName, playerSource, bVisible);
    obs.send("SetSceneItemProperties", {
        "scene-name": sceneName,
        item: playerSource,
        visible: bVisible,
    });
};

export const obsSetScene = (sceneName) => {
    // TODO: replace with transition override
    console.log("DEBUG: DEPRECATED obsSetScene CALLED!");
    obs.send("SetCurrentScene", {
        "scene-name": sceneName,
    });
};



export const obsPlayMedia = (sceneName, playerSource) => {
    // set the visibility of the source name
    obsSetPlayerVisibility(sceneName, playerSource, true);
    

    console.log("DEBUG: MEDIA PLAY OPERATION");
    obs.send("RestartMedia", {
         sourceName: playerSource,
    });

    // obsSetScene(sceneName);
};





export const obsLoadMedia = (sourceName, mediaPath) => {

    obs.send("SetSourceSettings", { 
        sourceName, 
        sourceSettings: {
            local_file: mediaPath, 
            restart_on_activate: false,
        } 
    });
    
    setTimeout(
    () => {
        obs.send("StopMedia", {
            sourceName,
        });

    }, 300);
    // obs.send("RestartMedia", {
    //     sourceName
    // })
};


export const obsGetMediaDuration = (sourceName, callback) => {
    obs.send("GetMediaDuration", {
        sourceName: sourceName
    }).then((res) => {
        callback(res.mediaDuration);
    });
};

export const obsGetMediaTime = (sourceName, callback) => {
    obs.send("GetMediaTime", {
        sourceName
    }).then((res) => {
        callback(res.timestamp);
    });
};