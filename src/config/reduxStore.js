import { configureStore } from '@reduxjs/toolkit';

import playlistReducer from './playlistSlice';
import settingsSlice from './settingsSlice';

// export return of configureStore
export default configureStore({
    reducer: {
        playlist: playlistReducer,
        settings: settingsSlice,
    },
});