import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    errorlist: [],
    errorInstant: "",
};



const reducerSlice = createSlice({
    name: 'errors',
    initialState,
    reducers: {
        showError(state, action) {
            state.errorInstant = action.payload;
        },

    },
});


export const errorSelector = state => state.errors;

export const { showError } = reducerSlice.actions;