import React from 'react';

import { MEDIA_STATE } from '../../config/playlistSlice';


const getStrTime = (ms) => {
    let time = new Date(ms);
    let msec = Math.round(time.getUTCMilliseconds() / 100);
    return ('0' + time.getUTCHours()).slice(-2) + ":" + 
        ('0' + time.getUTCMinutes()).slice(-2) + ":" + 
        ('0' + time.getUTCSeconds()).slice(-2) + "." + 
        ((msec >= 10) ? 0 : msec);
  }

export default function MediaItem({ media }) {
    // determine media status
    let status = "";
    let msg = "";

    switch(media.state) {
        case MEDIA_STATE.MEDIA_PLAY:
            status = "bg-success";
            msg = `Playing in Player${media.loadedInPlayer}`;
            break;
        
        case MEDIA_STATE.MEDIA_PAUSED:
        case MEDIA_STATE.MEDIA_READY:
            status = "bg-warning";
            msg =`Loaded in Player${media.loadedInPlayer}`;
            break;
        
        case MEDIA_STATE.MEDIA_ERR:
            status = "bg-danger";
            msg ="Media is in an error state";
            break;
        
        // case MEDIA_LISTED:
        default:
            status = "bg-primary";
            msg ="Listed Media";
    }



    return (
        <div className={`card text-white mb-1 ${status}`}>
            <div className="card-body">
                <h5 className="card-title">{media.mediaPath}</h5>
                <div className="card-text">
                    <p className="m-0">{msg}</p>
                    {(media.state === MEDIA_STATE.MEDIA_READY || 
                        media.state === MEDIA_STATE.MEDIA_PLAY || 
                        media.state === MEDIA_STATE.MEDIA_PAUSED) &&
                        <p className="font-monospace m-0">{getStrTime(media.time)} / {getStrTime(media.duration)} - Remaining: {getStrTime(media.duration - media.time)}</p>
                    }
                </div>
            </div>
        </div>
    );
}