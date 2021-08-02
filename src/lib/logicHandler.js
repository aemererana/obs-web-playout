/**
 * The logic handler componenet is the bridge among 
 * the reducers' state (settings, playlist, errorstate?)
 */
import React, { useEffect } from 'react';

// React-redux
import { useDispatch, useSelector } from 'react-redux';
import { CONNECTION_STATUS } from '../config/settingsSlice';
import store from './../config/reduxStore';


// obs Functions
import { 
    initializePlayers, 
    onMediaEndHandler, 
    getLoadedMedia, 
    loadMedia, 
    startOperation 
} from './mediaFunctions';

import { obs } from './obs';


obs.on('MediaEnded', data => {
    // call the media handler function
    const { playlist } = store.getState();

    if (!playlist.bOperation) {
        startOperation();
        onMediaEndHandler(data)
    } else {
        console.log("!!!!!!!!!!!!!!!!!DEBUG: OPERATION CANCELED!!!!!!!!!!!!!!!!!!!!");

    }
});


export default function LogicHandler() {
    const dispatch = useDispatch();
    const { settings, playlist } = useSelector(state => state);
    
    useEffect(() => {
        // initialize settings
        if(!settings.initialized && settings.connectionStatus === CONNECTION_STATUS.CONNECTED) {
            console.log("DEBUG: INITIALIZED IS CALLED");
            initializePlayers();
        }

        if(settings.initialized && settings.connectionStatus === CONNECTION_STATUS.CONNECTED) {
            /** 
             *  Check whether to load more medias, or not
             *  get the number of loaded media
            */
            const loadedMedia = getLoadedMedia();
            
            // Does it need to load media?
            if(
                (loadedMedia.length === 0 && playlist.mediaList.length > 0) ||
                (loadedMedia.length < 2 && playlist.mediaList.length >= 2)) 
            {
                /** Load media */
                loadMedia(loadedMedia);
            } 
        }


    }, [dispatch, playlist.mediaList, settings]);
    
    // return empty component
    return (
        <React.Fragment></React.Fragment>
    );
}