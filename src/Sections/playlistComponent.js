import React from 'react';
import { Container } from 'react-bootstrap';

// react redux
import { useSelector } from 'react-redux';
import { playlistSelector, MEDIA_STATE } from '../config/playlistSlice';

export default function Playlist() {
    const playlist  = useSelector(playlistSelector);

    const mediaRender = (media, key) => {

        let status = "";
        let msg = "";
        switch(media.state) {
            case MEDIA_STATE.MEDIA_PLAY:
                status = "bg-success";
                msg = `Playing in Player${media.loadedInPlayer}`;
                break;
            

            case MEDIA_STATE.MEDIA_READY:
                status = "bg-warning";
                msg = `Loaded in Player${media.loadedInPlayer}`;
                break;
            
            case MEDIA_STATE.MEDIA_ERR:
                status = "bg-danger";
                msg = "Media is in an error state";
                break;
            
            // case MEDIA_LISTED:
            default:
                status = "bg-primary"
                msg = "Not Loaded in any player";
        }

        return (
        <div className={`card text-white mb-1 ${status}`} key={key}>
            <div className="card-body">
                <h5 className="card-title">{media.mediaPath}</h5>
                <p className="card-text">{msg}</p>
            </div>
        </div>
    )};

    
    return(
        <Container fluid="md" className="p-1">
            

            {playlist.mediaList.map((val, i) => {
                return mediaRender(val, i);
            })}

            
        </Container>
    );
}