import React from 'react';

import { Modal, Spinner } from 'react-bootstrap';

export default function StatusModal({ isVisible }) {

    return(
        <Modal show={isVisible} onHide={() => {}}>
            <Modal.Header>
                <Modal.Title>Connection Status</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Connecting to the server.</p>
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Connecting...</span>
                    </Spinner>
                </div>
            </Modal.Body>
        </Modal>
    );
}