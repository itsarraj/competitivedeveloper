import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
    posts: [],
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPost: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
    },
});

export const postReducer = postSlice.reducer;
export const postActions = postSlice.actions;

// Selector
export const postSelector = createSelector(
    (state) => state.postReducer.posts,
    (posts) => posts
);
