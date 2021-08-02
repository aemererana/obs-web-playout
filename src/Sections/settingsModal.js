import React, { useEffect, useState, useRef } from 'react';

import { 
    Modal, 
    Button, 
    InputGroup, 
    FormControl, 
    Dropdown, 
    DropdownButton,
    Form,
    FloatingLabel,
    Badge,
    Col,
    Row,
} from 'react-bootstrap';

// react redux
import { useDispatch, useSelector } from 'react-redux';
import { CONNECTION_STATUS, saveSettings, settingsSelector } from '../config/settingsSlice';
import { resetPlaylist } from '../config/playlistSlice';

// media functions
import { 
    stopMedia,
    connectOBS 
} from '../lib/mediaFunctions';

export default function SettingsModal({onClose, isVisible}) {
    const [media1State, setMedia1State] = useState();
    const [media2State, setMedia2State] = useState();

    const media1 = useRef();
    const media2 = useRef();
    const scene = useRef();
    const serverAddr = useRef();
    const pathFolder= useRef();

    const dispatch = useDispatch();
    const settings = useSelector(settingsSelector);

    useEffect(() => {
        // get player source names from settings store
        const medias = settings.mediaPlayers;
        setMedia1State(medias.player1);
        setMedia2State(medias.player2);

    }, [dispatch, settings]);

    const handleSave = () => {
        dispatch(saveSettings({
            mediaPlayers: {
                player1: media1.current.value,
                player2: media2.current.value
            },
            sceneName: scene.current.value,
            serverAddr: serverAddr.current.value,
            pathFolder: pathFolder.current.value,
            
        }));

        
        onClose();
    };

    const handleResetPlaylist = () => {
        stopMedia();
        dispatch(resetPlaylist());
    };


    return(
        <Modal show={isVisible} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {/* Server status and connect button */}
                <Row>
                    <Col sm={8} className="pt-2" >
                        <h5>
                            Server Status: {settings.connectionStatus === CONNECTION_STATUS.CONNECTED ? (<Badge bg="success" className="mb-3">Connected</Badge>) : (<Badge bg="danger" className="mb-3">Disconnected</Badge>)}
                        </h5>
                    </Col>
                    <Col sm={4} style={{textAlign: "right"}}>
                        {/* Connect Button */}
                        <Button 
                            disabled={settings.connectionStatus === CONNECTION_STATUS.CONNECTED}
                            onClick={() => {
                                connectOBS();
                            }}
                        >
                            Connect
                        </Button>
                    </Col>
                </Row>


                {/* Server Address Component */}
                <FloatingLabel
                    controlId="floatingInput"
                    label="Server address"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="localhost:4444" defaultValue={settings.serverAddr} ref={serverAddr} />
                </FloatingLabel>


                {/* Scene Name */}
                <InputGroup className="mb-3">
                    <DropdownButton
                        variant="outline-secondary"
                        title="Playout Scene"
                        id="playout-scene"
                    >
                        <Dropdown.Item href="#">Action</Dropdown.Item>
                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                    </DropdownButton>
                    <FormControl aria-label="Playout Scene" ref={scene} defaultValue={settings.sceneName} />
                </InputGroup>

                {/* Playout 1 */}
                <InputGroup className="mb-3">
                    <DropdownButton
                        variant="outline-secondary"
                        title="Media 1 Source"
                        id="playout-media-1"
                    >
                        <Dropdown.Item href="#">Action</Dropdown.Item>
                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                    </DropdownButton>
                    <FormControl aria-label="Media 1 Source" ref={media1} defaultValue={media1State} />
                </InputGroup>

                {/* Playout 2*/}
                <InputGroup className="mb-3">
                    <DropdownButton
                        variant="outline-secondary"
                        title="Media 2 Source"
                        id="playout-media-2"
                    >
                        <Dropdown.Item href="#">Action</Dropdown.Item>
                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                    </DropdownButton>
                    <FormControl aria-label="Media 2 Source" ref={media2} defaultValue={media2State} />
                </InputGroup>

                {/* Default media folder path */}
                <FloatingLabel
                    controlId="defaultPath"
                    label="Default Media Path"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="C:\FakePath\" defaultValue={settings.pathFolder} ref={pathFolder} />
                </FloatingLabel>

                <Button variant="danger" className="w-100" onClick={handleResetPlaylist}>Reset Playlist</Button>

                
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    );
}