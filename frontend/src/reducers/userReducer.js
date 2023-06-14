import Cookies from 'js-cookie';

import { createSelector, createSlice } from '@reduxjs/toolkit';

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
        LOGOUT: (state, action) => {
            state.user = null;
            Cookies.set('user', null);
            return;
        },
    },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;

// Selector
const selectUser = createSelector(
    [(state) => ({ ...state.userReducer.user })],
    (user) => {
        return user;
    }
);

export const userSelector = (state) => selectUser(state);

// export const userSelector = (state) => ({ ...state.userReducer.user });
