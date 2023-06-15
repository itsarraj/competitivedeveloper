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
            return;
        },
        addPost: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const postReducer = postSlice.reducer;
export const postActions = postSlice.actions;

// Selector
const selectPost = createSelector(
    [(state) => [...state.postReducer.posts]],
    (post) => {
        return post;
    }
);

export const postSelector = (state) => selectPost(state);

// export const userSelector = (state) => ({ ...state.userReducer.user });
