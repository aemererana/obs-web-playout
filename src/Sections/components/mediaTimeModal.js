import React, { useRef, useEffect } from 'react';

import {
    Modal,
    FloatingLabel,
    Form,
    Button
} from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { playlistSelector } from '../../config/playlistSlice';

export default function MediaTimeModal({ isVisible, onClose, idx, onSetTimeMedia }) {
    const timeRef = useRef();
    const playlist = useSelector(playlistSelector);

    useEffect(() => {
        if(timeRef.current) {
            timeRef.current.value = playlist.mediaList[idx].time;
        }
    }, [idx, playlist.mediaList]);


    return (
        <Modal show={isVisible} onHide={onClose} onShow={() => {timeRef.current.focus()}}>
        <Modal.Header closeButton>
            <Modal.Title>Set Media Time</Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <FloatingLabel
                controlId="mediaTime"
                label="Media Time in milliseconds"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="0" ref={timeRef} />
            </FloatingLabel>


        </Modal.Body>

        <Modal.Footer>
            <Button type="submit" variant="primary" onClick={() => onSetTimeMedia(idx, Number.parseInt(timeRef.current.value))}>Okay</Button>
            <Button variant="secondary" onClick={onClose}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}