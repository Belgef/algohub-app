import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import commentApi from './slices/commentApi';
import lessonApi from './slices/lessonApi';
import problemApi from './slices/problemApi';
import solveApi from './slices/solveApi';
import tagApi from './slices/tagApi';
import userApi from './slices/userApi';

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [problemApi.reducerPath]: problemApi.reducer,
        [lessonApi.reducerPath]: lessonApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        [solveApi.reducerPath]: solveApi.reducer,
        [tagApi.reducerPath]: tagApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userApi.middleware)
            .concat(problemApi.middleware)
            .concat(lessonApi.middleware)
            .concat(commentApi.middleware)
            .concat(solveApi.middleware)
            .concat(tagApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
