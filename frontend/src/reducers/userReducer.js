import Cookies from 'js-cookie';

const initialState = null;

import { createSlice } from '@reduxjs/toolkit';

const noteSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        Login: (state, action) => {
            return action.payload;
        },
        default: (state, action) => {
            return state;
        },
    },
});

export const userReducer = noteSlice.reducer;
export const actions = noteSlice.actions;
// Selector
export const noteSelector = (state) => state.userReducer.notes;
