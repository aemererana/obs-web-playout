import { createSlice } from '@reduxjs/toolkit';
import { defaultSettings } from './defaultStates';

export const CONNECTION_STATUS = {
    DISCONNECTED: 0,
    CONNECTING: 1,
    CONNECTED: 2,
    ERROR: -1,
};

const initialState = {
    ...(
        (localStorage.getItem("Settings") === null) ? 
        defaultSettings :
        JSON.parse(localStorage.getItem("Settings"))
    ),
    initialized: false,
    connectionStatus: CONNECTION_STATUS.DISCONNECTED,
};

/**
 * Updates semi persistent state for the application.
 * It also removes any non persistent.
 * 
 * @param state     state to be saved.
 */
const updatePersistentState = (state) => {
    let copyState = { ...state };
    delete copyState.initialized;
    delete copyState.connectionStatus;

    localStorage.setItem("Settings", JSON.stringify(copyState));
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        
        initialized(state) {
            state.initialized = true;
        },

        saveSettings(state, actions) {
            state = {
                ...state,
                ...actions.payload,
            };

            updatePersistentState(state);
        },

        setConnectionStatus(state, action) {
            state.connectionStatus = action.payload;
        },

        setFolderPath(state, action) {
            state.pathFolder = action.payload;
            updatePersistentState(state);
        }


    },
});

export const settingsSelector = state => state.settings;

export const { initialized, saveSettings, setConnectionStatus } = settingsSlice.actions;
export default settingsSlice.reducer;
