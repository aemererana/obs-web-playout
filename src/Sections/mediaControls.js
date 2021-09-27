import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import SettingsModal from './settingsModal';
import AddMediaModal from './components/addMediaModal';

// react redux
import { useSelector } from 'react-redux';
import { PLAYER_STATE } from './../config/playlistSlice';


// media functions
import { playMedia, stopMedia, nextMedia } from '../lib/mediaFunctions';
import { CONNECTION_STATUS } from '../config/settingsSlice';

export default function MediaControls() {

    const { settings, playlist } = useSelector(state => state);

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [addMediaModal, setAddMediaModal] = useState(false);
    

    useEffect(() => {
        // check if settings is there, if not show settings dialog
        let settings = localStorage.getItem("Settings");
        if(settings === null) {
            setSettingsOpen(true);
        }

    }, []);

    // Callback handlers--------------------------------------------------------------------------
    const openSettings = () => {
        setSettingsOpen(true);
    };
    

    const addMediaToList = () => {
        setAddMediaModal(true);
    };


    // callback of the onClick button
    const play = () => {
        playMedia();
    }; // end of play();


    const stop = () => {
        stopMedia();
    }; // end of stop();



    // Callback handlers--------------------------------------------------------------------------
    const isPlayerPlaying = playlist.playerState === PLAYER_STATE.PLAYING;    

    return (
        <>
        <div className="position-fixed vw-100 text-center" style={{bottom: "5px"}}>

            <Button variant="primary" className="me-1" onClick={play} disabled={isPlayerPlaying}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                </svg>
            </Button>

            <Button variant="primary" className="me-1" disabled={!isPlayerPlaying}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause" viewBox="0 0 16 16">
                    <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                </svg>
            </Button>

            <Button variant="primary" className="me-1" onClick={nextMedia} disabled={!isPlayerPlaying}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-forward-fill" viewBox="0 0 16 16">
                    <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5z" />
                </svg>
            </Button>

            <Button variant="danger" className="me-1" onClick={stop} disabled={!isPlayerPlaying}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stop-fill" viewBox="0 0 16 16">
                    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
                </svg>
            </Button>

            <Button variant="primary" className="me-1" onClick={addMediaToList}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
            </Button>

            <Button variant="secondary" className="me-1" onClick={openSettings}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
            </Button>


        </div>

        <SettingsModal
            isVisible={settingsOpen || settings.connectionStatus === CONNECTION_STATUS.DISCONNECTED}
            onClose={() => setSettingsOpen(s => !s)}
        />
        <AddMediaModal isVisible={addMediaModal} onClose={() => setAddMediaModal(s => !s)} />
        </>
    );
}