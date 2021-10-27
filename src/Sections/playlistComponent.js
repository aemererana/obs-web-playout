import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

// react redux
import { useDispatch, useSelector } from 'react-redux';
import { playlistSelector, setMediaStartTime } from '../config/playlistSlice';

import MediaItem from './components/mediaItemComponent';
import MediaTimeModal from './components/mediaTimeModal';


export default function Playlist() {
    const [isMediaTimeModal, setShowMediaTimeModal] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(-1);
    const playlist  = useSelector(playlistSelector);

    const dispatch = useDispatch();


    const showSetMediaTime = (key) => {
        setShowMediaTimeModal(true);
        setSelectedIdx(key);
    };

    const onSetTimeMedia = (idx, timestamp) => {
        dispatch(setMediaStartTime({
            mediaIndex: idx,
            mediaTime: timestamp
        }));

        setShowMediaTimeModal(false);
    };
    
    return(
        <>
        <Container fluid="md" className="p-1">
            

            {playlist.mediaList.map((val, i) => {
                return (<MediaItem media={val} key={i} idx={i} showSetMediaTime={showSetMediaTime} />)
            })}

            
        </Container>
        <MediaTimeModal 
          isVisible={isMediaTimeModal} 
          idx={selectedIdx} 
          onClose={() => setShowMediaTimeModal(s => !s )}
          onSetTimeMedia={onSetTimeMedia}
        />
        </>
    );
}