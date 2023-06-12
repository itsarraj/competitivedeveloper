import Cookies from 'js-cookie';

const initialState = {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
};

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LOGIN: (state, action) => {
            return action.payload;
        },
    },
});

export const userReducer = userSlice.reducer;
export const actions = userSlice.actions;
// Selector
export const noteSelector = (state) => state.userReducer.user;
