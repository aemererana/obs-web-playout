import React from 'react';

// sub components
import StatusModal from './Sections/components/connectionModal';
import Alert from './Sections/components/alertComponent';
import Playlist from './Sections/playlistComponent';
import MediaControls from './Sections/mediaControls';
import LogicHandler from './lib/logicHandler';

// React-redux
import { useSelector } from 'react-redux';
import { CONNECTION_STATUS, settingsSelector } from './config/settingsSlice';

function App() {
    const settings = useSelector(settingsSelector);

    // actual rendering
    return (
        <>
            <Alert />
            <StatusModal isVisible={ settings.connectionStatus === CONNECTION_STATUS.CONNECTING } />
        
            {/** Is the client connected? */
            <>
                <Playlist />
                <MediaControls />
            </>
            }
            <LogicHandler />
        </>
    );
}

export default App;
