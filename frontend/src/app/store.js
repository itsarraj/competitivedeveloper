import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../reducers/index.js';
import { postReducer } from '../reducers/index.js';
export default configureStore({
    reducer: {
        userReducer,
        postReducer,
    },
});
