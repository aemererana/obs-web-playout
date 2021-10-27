
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

    obsSetScene(sceneName);
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
    obs.send("SetCurrentScene", {
        "scene-name": sceneName,
    });
};


export const obsPlayMedia = (sceneName, playerSource, isTimed = false) => {
    if(isTimed) {
        obsSetPlayerVisibility(sceneName, playerSource, true);
        // obs.send("ExecuteBatch", {
        //     requesst: [
        //         {
        //             "request-type": ""
        //         }
        //     ]
        // })
        // blindly restart media to get have the ability to start
        // on set time
        obs.send("RestartMedia", {
            sourceName: playerSource
        });

    } else {
        // set the visibility of the source name
        obsSetPlayerVisibility(sceneName, playerSource, true);
    
        // TODO: replace with transition override
        obs.send("SetCurrentScene", {
            "scene-name": sceneName,
        });
    }
};


export const obsPauseMedia = (sourceName) => {
    obs.send("PlayPauseMedia", {
        sourceName,
        playPause: true // true for pause
    });
}



export const obsLoadMedia = (sourceName, mediaPath) => {
    obs.send("SetSourceSettings", { 
        sourceName: sourceName, 
        sourceSettings: {
            local_file: mediaPath, 
            restart_on_activate: true
        } 
    });
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

export const obsSetMediaTime = (sourceName, timestamp) => {
    obs.send("SetMediaTime", {
        sourceName,
        timestamp
    });
}