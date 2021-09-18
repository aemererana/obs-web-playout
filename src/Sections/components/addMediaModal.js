import React, { useRef } from 'react';

import { 
    Modal, 
    FloatingLabel, 
    Form,
    Button
} from 'react-bootstrap';

// react-redux
import { useSelector, useDispatch } from 'react-redux';
import { settingsSelector } from '../../config/settingsSlice';
import { addMedia } from '../../config/playlistSlice';

export default function AddMediaModal({ isVisible, onClose }) {
    const settings = useSelector(settingsSelector);
    const dispatch = useDispatch();
    const fileInputRef = useRef();

    const selectMedia = () => {
        fileInputRef.current.click();
    };

    const onFileInputChanged = () => {
        dispatch(addMedia(settings.pathFolder + (fileInputRef.current.files[0]["name"] !== undefined ? fileInputRef.current.files[0].name : "")));
        fileInputRef.current.value = "";
        onClose();
    };

    const onChangeFolderPath = () => {
        dispatch()
    };

    return(
        <Modal show={isVisible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Adding Media</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                <FloatingLabel
                    controlId="mediaPath"
                    label="Folder Path"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="C:\FakePath\" defaultValue={settings.pathFolder} onChange={onChangeFolderPath} />
                </FloatingLabel>
                
                <Button variant="primary" className="w-100" onClick={selectMedia}>Select Media</Button>

                <Form.Group controlId="formFile" className="mb-3" style={{ display: "none" }}>
                    <Form.Control type="file" ref={fileInputRef} onChange={onFileInputChanged} accept="video/*" />
                </Form.Group>

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}