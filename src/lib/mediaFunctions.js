import store from './../config/reduxStore';
import { 
    setMediaPlaying, 
    stopPlayer, 
    removeMedia,  
    loadedMediaIntoPlayer,
    setActivePlayer,
    setOperationStarted,
    setOperationEnd,
    setMediaDuration,
    setMediaTime,
    PLAYER_STATE,
    MEDIA_STATE,
} from './../config/playlistSlice';

import { 
    initialized,
    setConnectionStatus, 
    CONNECTION_STATUS,
} from '../config/settingsSlice';

import {
    obs, 
    obsLoadMedia,
    obsPlayMedia, 
    obsSetPlayerVisibility, 
    obsSetScene, 
    obsStopMediaPlayback ,
    obsGetMediaDuration,
    obsGetMediaTime,
} from './obs';

const dispatch = store.dispatch;

/**
 * Connecting OBS client to server
 */
export const connectOBS = () => {
    const { settings } = store.getState();

    const password = prompt("Password?");

    dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTING));

    obs.connect({ address: settings.serverAddr, password })
        .then(() => {
            dispatch(setConnectionStatus(CONNECTION_STATUS.CONNECTED));

        })
        .catch(err => {
            dispatch(setConnectionStatus(CONNECTION_STATUS.ERROR));

        }
    );

    obs.on('error', err => {
        console.error('OBS ERROR:', err);
    });

    obs.on('ConnectionClosed', () => {
        dispatch(setConnectionStatus(CONNECTION_STATUS.DISCONNECTED));
    });

};

export const initializePlayers = async () => {
    const { settings } = store.getState();

    let media1Status = false, media2Status = false;

    try {
        await obs.send("GetSourceSettings", {
            sourceName: settings.mediaPlayers.player1,
        });
        media1Status = true;

        await obs.send("GetSourceSettings", {
            sourceName: settings.mediaPlayers.player2,
        });
        media2Status = true;
    } catch (err) {
        console.log("ERROR: Initialize players error", err);
    }

    // hide both players
    for (const [/*key*/, value] of Object.entries(settings.mediaPlayers)) {
        obsSetPlayerVisibility(settings.sceneName, value, false);
    }


    // TODO: make sure that both sources are not playing
    if(media1Status && media2Status)
        dispatch(initialized());    
    else
        console.log("ERROR: INITIALIZATION FAILED!");
};


/**
 * Get the array that is already loaded in the player
 * 
 * @returns     array of loaded media, it should match 
 *              the number of available media players
 */
export const getLoadedMedia = () => {
    const  { playlist } = store.getState();
    // get and count loaded media from the playlist 
    return playlist.mediaList.filter(elm => {
        if (elm.loadedInPlayer !== 0 && elm.state > 0)
            return true;

        return false;
    });
};


/**
 * Called by logic handler when the loading of media is required
 */
export const loadMedia = (loadedMedia = getLoadedMedia()) => {
    const { settings, playlist } = store.getState();

    console.log("DEBUG: LOAD MEDIA", settings.mediaPlayers);

    /** Load Media */

    // determine the next player to load media into
    const mediaPlayersArr = Object.entries(settings.mediaPlayers);

    const findNextPlayerIndex = (curPlayer) => {
        return curPlayer % mediaPlayersArr.length;
    }

    let loadInPlayerIndex = findNextPlayerIndex(playlist.playerActive);

    let loadedCount = loadedMedia.length;
    for (let i = 0; i < playlist.mediaList.length; i++) {
        // is it enough loaded media? 
        if(loadedCount === mediaPlayersArr.length)
            break;
        
        // get the media to be loaded into the player
        const media = playlist.mediaList[i];
        if(media.state === MEDIA_STATE.MEDIA_LISTED) {
            // sourceName = mediaPlayersArr[mediaPlayerIndex][1];
            // media.mediaPath,
            console.log("DEBUG: Value of loading MEDIA", mediaPlayersArr[loadInPlayerIndex][1], media.mediaPath);
            
            const sourceName = mediaPlayersArr[loadInPlayerIndex][1];
            obsLoadMedia(sourceName, media.mediaPath);

            // wait a bit before sending get duration
            setTimeout(() => {
                obsGetMediaDuration(sourceName, (duration) => {
                    dispatch(setMediaDuration({
                        mediaIndex: i,
                        mediaDuration: duration
                    }))
                })
            }, 300);

            // update media status on app state
            dispatch(loadedMediaIntoPlayer({ 
                mediaIndex: i, 
                loadedInPlayer: loadInPlayerIndex + 1,
            }));

            // set active player if none is active
            if(playlist.playerActive === 0)
                dispatch(setActivePlayer(1));

            // setting up for next media, J-I-C
            loadInPlayerIndex = findNextPlayerIndex(playlist.playerActive + 1);
            loadedCount++;
        }
    } // end of for


};


/**
 * Function to play already loaded media from the playlist
 */
export const playMedia = () => {
    // get application state
    const { settings, playlist } = store.getState();

    if(playlist.mediaList.length === 0) {
        console.log("ERROR: There are no media to play");
        stopMedia();
        return;
    }
    
    
    let loadedMedia = getLoadedMedia();
    if(loadedMedia.length === 0) {
        console.log("ERROR: There are no loaded media in the players.");
        return;
    }

    if(playlist.playerActive === 0) {
        console.log("ERROR: Active player has not be set properly");
        return;
    }

    console.log("DEBUG: PLAY OPERATION BEGINS Active Player:", playlist.playerActive);
    
    // get the active player's source name
    let playerSource = "";
    let i = 0;
    for (const [, v] of Object.entries(settings.mediaPlayers)) {
        if (i === (playlist.playerActive-1)) {
            playerSource = v;
            break;
        }

        // Hide the other player(s)
        obsSetPlayerVisibility(settings.sceneName, v, false);
        i++;
    }
    
    // obs send command
    obsPlayMedia(settings.sceneName, playerSource);

    /** Update media status on the application */

    setTimeout(() => {
        updatePlaybackTime(playlist.playerActive, playerSource);
    }, 300);

    // getting the index of the media from the playlist
    i = 0;
    for (const media of playlist.mediaList) {
        if (media.loadedInPlayer === playlist.playerActive) {
            break;
        }

        i++;
    }

    // update redux state
    if(playlist.mediaList.length > i)
        dispatch(setMediaPlaying(i));

    // end operation lock
    setTimeout(() => {
        endOperation();

    }, 3000);

}; // end of play();


const updatePlaybackTime = async (mediaPlayer, sourceName) => {
    const { playlist } = store.getState();
    if(playlist.playerActive === mediaPlayer) {
        
        // Get the playback time
        obsGetMediaTime(
            sourceName, 
            (timestamp) => {
                dispatch(setMediaTime({
                    mediaIndex: 0,
                    mediaTime: timestamp,
                }));
            }
        );
        
        setTimeout(() => {
            updatePlaybackTime(mediaPlayer, sourceName);
        }, 100);
    } else {
        console.log("DEBUG: END OF UPDATE PLAYBACK TIME!");
    }
};


/**
 * Funtion that stops the media playback
 */
export const stopMedia = () => {
    // get application state
    const { settings } = store.getState();


    // put source names into an array
    let playersArr = [];
    for(const [, v] of Object.entries(settings.mediaPlayers)) {
        playersArr.push(v);
    }
    
    // send obs commands
    obsStopMediaPlayback(settings.sceneName, playersArr);

    // update app status
    dispatch(stopPlayer());
};


/**
 * Callback handler for the event that OBS will send
 * 
 * @param {*} data 
 */
export const onMediaEndHandler = (data) => {
    console.log("DEBUG: The OnEndHandler has been called------------------------------------");
    const { settings, playlist } = store.getState();

    let isPlayoutSource = false;
    const mediaPlayersArr = Object.entries(settings.mediaPlayers);
    for(const [, v] of mediaPlayersArr) {
        if(data.sourceName === v) {
            isPlayoutSource = true;
            break;
        }
    }

    // the media that ended is part of the playout player??
    if(isPlayoutSource && playlist.playerState === PLAYER_STATE.PLAYING) {
        // if it is, next or check media

        // update redux's active player
        let newPlayer = (playlist.playerActive + 1) > mediaPlayersArr.length ? 
            (playlist.playerActive + 1) % mediaPlayersArr.length :
            playlist.playerActive + 1;

        dispatch(setActivePlayer(newPlayer));
        // remove the finished media from the playlist.
        
        // hide the player and switch scene immediately
        console.log("DEBUG: VISIBILITY SWITCH OFF Scene: ", settings.sceneName, " Source: ", data.sourceName);
        obsSetPlayerVisibility(settings.sceneName, data.sourceName, false);
        obsSetScene(settings.sceneName);
        
        
        dispatch(removeMedia(0));
        playMedia();
        
    }
};



export const startOperation = () => {
    console.log("~~~~~~~~~DEBUG: OPERATION LOCK START~~~~~~~~~");
    dispatch(setOperationStarted());
}

export const endOperation = () => {
    console.log("~~~~~~~~~DEBUG: OPERATION LOCK END!~~~~~~~~~");
    dispatch(setOperationEnd());
}