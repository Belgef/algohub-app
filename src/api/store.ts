import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import commentApi from './slices/commentApi';
import lessonApi from './slices/lessonApi';
import problemApi from './slices/problemApi';
import userApi from './slices/userApi';

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [problemApi.reducerPath]: problemApi.reducer,
        [lessonApi.reducerPath]: lessonApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(problemApi.middleware)
        .concat(lessonApi.middleware)
        .concat(commentApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
