import Cookies from 'js-cookie';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LOGIN: (state, action) => {
            state.user = action.payload;
            return;
        },
    },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
// Selector
export const userSelector = (state) => ({ ...state.userReducer.user });
