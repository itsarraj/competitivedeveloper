import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index.js';

export default configureStore({
    reducer: {
        user: rootReducer,
    },
});
