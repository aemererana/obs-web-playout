import React from 'react';
import { Container } from 'react-bootstrap';

// react redux
import { useSelector } from 'react-redux';
import { playlistSelector } from '../config/playlistSlice';

import MediaItem from './components/mediaItemComponent';


export default function Playlist() {
    const playlist  = useSelector(playlistSelector);
    
    return(
        <Container fluid="md" className="p-1">
            

            {playlist.mediaList.map((val, i) => {
                return (<MediaItem media={val} key={i} />)
            })}

            
        </Container>
    );
}