import { createSlice } from '@reduxjs/toolkit';
import { defaultPlaylist, MEDIA_STATE, PLAYER_STATE, MEDIA_OBJ } from './defaultStates';

// re-export
export { MEDIA_STATE, PLAYER_STATE };

const initialState = {
    ...(
        (localStorage.getItem("Playlist") === null) ? 
        defaultPlaylist : 
        JSON.parse(localStorage.getItem("Playlist"))
    ),
    bOperation: false, // use to lock the play-next-media operation
};


/**
 * Updates the semi persistent data that is 
 * stored in the local storage of the browser
 * 
 * @param state     current state object
 */
const updatePersistentData = (state) => {
    let semiPersistState = {
        ...state,
    };

    delete semiPersistState.bOperation;
    localStorage.setItem("Playlist", JSON.stringify(semiPersistState));
}


const reducerSlice = createSlice({
    name: 'playList',
    initialState,
    reducers: {
        // reducer and action for adding media
        // @param    action.payload  - media path to be added
        addMedia(state, action) {
            console.log("DEBUG: Adding a media to playlist");
            state.mediaList.push({ 
                ...MEDIA_OBJ,
                mediaPath: action.payload, 
                state: MEDIA_STATE.MEDIA_LISTED,
            });

            updatePersistentData(state);
        },

        // @param    action.payload  - index of media to be removed
        removeMedia(state, action) {
            console.log("DEBUG: remove of media was called")
            state.mediaList.splice(action.payload, 1);


            updatePersistentData(state);
        },

        // removing all media from playlist
        resetPlaylist(state) {
            state.mediaList = [];
            state.playerActive = 0;
            state.playerState = PLAYER_STATE.STOPPED;
            
            updatePersistentData(state);
        },

        // loading of media to the source player
        // @param    action.payload  = { mediaIndex: , loadedInPlayer: , mediaDuration: }
        loadedMediaIntoPlayer(state, action) {
            let currentMedia = state.mediaList[action.payload.mediaIndex];
            
            // Update the media status
            state.mediaList[action.payload.mediaIndex] = {
                ...currentMedia,
                state: MEDIA_STATE.MEDIA_READY,
                loadedInPlayer: action.payload.loadedInPlayer
            };

            updatePersistentData(state);
        },

        stopPlayer(state) {
            state.playerState = PLAYER_STATE.STOPPED;
            state.playerActive = 0;

            // put any media to stop playing
            for(let i = 0; i < state.mediaList.length; i++) {
                state.mediaList[i].loadedInPlayer = 0;
                state.mediaList[i].state = MEDIA_STATE.MEDIA_LISTED;
            } 

            updatePersistentData(state);

        },

        //@param    action.payload  - index of the media from the playlist which status is being changed
        setMediaPlaying(state, action) {
            state.mediaList[action.payload].state = MEDIA_STATE.MEDIA_PLAY;
            state.playerState = PLAYER_STATE.PLAYING;

            updatePersistentData(state);

        },

        setActivePlayer(state, action) {
            state.playerActive = action.payload;
            updatePersistentData(state);

        },

        setOperationStarted(state) {
            state.bOperation = true;
        },

        setOperationEnd(state) {
            state.bOperation = false;            
        },

        setMediaDuration(state, action) {
            let currentMedia = state.mediaList[action.payload.mediaIndex];
            
            // update media duration
            state.mediaList[action.payload.mediaIndex] = {
                ...currentMedia,
                duration: action.payload.mediaDuration,
            };
        },

        setMediaTime(state, action) {
            let currentMedia = state.mediaList[action.payload.mediaIndex];
            
            // update media duration
            state.mediaList[action.payload.mediaIndex] = {
                ...currentMedia,
                time: action.payload.mediaTime,
            };
        }


    },
});


export const playlistSelector = state => state.playlist;

// exporting actions
export const { 
    addMedia, 
    removeMedia, 
    setMediaPlaying, 
    stopPlayer,
    resetPlaylist, 
    loadedMediaIntoPlayer, 
    toggleActivePlayer,
    setActivePlayer,
    setOperationStarted,
    setOperationEnd,
    setMediaDuration,
    setMediaTime,
} = reducerSlice.actions;


export default reducerSlice.reducer;