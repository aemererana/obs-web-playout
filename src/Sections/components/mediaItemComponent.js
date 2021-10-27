import React, { useState } from 'react';
import { Container,
     Row,
     Col,
     Button,
     ButtonGroup,
     ToggleButton 
} from 'react-bootstrap';

import { MEDIA_STATE } from '../../config/playlistSlice';


const getStrTime = (ms) => {
    let time = new Date(ms);
    let msec = Math.round(time.getUTCMilliseconds() / 100);
    return ('0' + time.getUTCHours()).slice(-2) + ":" + 
        ('0' + time.getUTCMinutes()).slice(-2) + ":" + 
        ('0' + time.getUTCSeconds()).slice(-2) + "." + 
        ((msec >= 10) ? 0 : msec);
  }

export default function MediaItem({ media, showSetMediaTime, idx }) {
    const [isLooped, setLooped] = useState(false);

    // determine media status
    let status = "";
    let msg = "";

    switch(media.state) {
        case MEDIA_STATE.MEDIA_PLAY:
            status = "bg-success";
            msg = `Playing in Player${media.loadedInPlayer}`;
            break;
        
        case MEDIA_STATE.MEDIA_START_TIMED:
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
                <Container>
                    <Row>
                        <Col sm={12} md={10}>
                            <h5 className="card-title">{media.mediaPath}</h5>
                            <div className="card-text">
                                <p className="m-0">{msg}</p>
                                {(media.state === MEDIA_STATE.MEDIA_READY ||
                                    media.state === MEDIA_STATE.MEDIA_START_TIMED ||
                                    media.state === MEDIA_STATE.MEDIA_PLAY ||
                                    media.state === MEDIA_STATE.MEDIA_PAUSED) &&
                                    <p className="font-monospace m-0">{getStrTime(media.time)} / {getStrTime(media.duration)} - Remaining: {getStrTime(media.duration - media.time)}</p>
                                }
                            </div>
                        </Col>
                        <Col sm={12} md={2} className="text-end">
                            {/* Set Playback time button */}
                            <Button variant="secondary" size="sm" className="me-1 align-top" onClick={() => { showSetMediaTime(idx) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stopwatch" viewBox="0 0 16 16">
                                    <path d="M8.5 5.6a.5.5 0 1 0-1 0v2.9h-3a.5.5 0 0 0 0 1H8a.5.5 0 0 0 .5-.5V5.6z" />
                                    <path d="M6.5 1A.5.5 0 0 1 7 .5h2a.5.5 0 0 1 0 1v.57c1.36.196 2.594.78 3.584 1.64a.715.715 0 0 1 .012-.013l.354-.354-.354-.353a.5.5 0 0 1 .707-.708l1.414 1.415a.5.5 0 1 1-.707.707l-.353-.354-.354.354a.512.512 0 0 1-.013.012A7 7 0 1 1 7 2.071V1.5a.5.5 0 0 1-.5-.5zM8 3a6 6 0 1 0 .001 12A6 6 0 0 0 8 3z" />
                                </svg>
                            </Button>

                            {/* loop button */}
                            <ButtonGroup className="mb-2">
                                <ToggleButton
                                    id="toggle-check"
                                    type="checkbox"
                                    variant={isLooped ? "primary" : "secondary"}
                                    size="sm"
                                    checked={isLooped}
                                    value="1"
                                    onChange={(e) => setLooped(e.currentTarget.checked)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                                        <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                                    </svg>
                                </ToggleButton>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>

            </div>
        </div>
    );
}