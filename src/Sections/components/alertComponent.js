import React from 'react';

import { 
    Toast,
    ToastContainer
} from 'react-bootstrap';

export default function Alert({ type, message }) {

    return(
        <ToastContainer position="top-end" className="p-3" style={{zIndex: 2000}}>
            <Toast>
                <Toast.Header>
                    <strong className="me-auto">Alert Message</strong>
                </Toast.Header>
                <Toast.Body>
                    This is a Sample
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
}