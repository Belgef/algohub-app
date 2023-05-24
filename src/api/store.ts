import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import lessonApi from './slices/lessonApi';
import problemApi from './slices/problemApi';
import userApi from './slices/userApi';

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [problemApi.reducerPath]: problemApi.reducer,
        [lessonApi.reducerPath]: lessonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(problemApi.middleware)
        .concat(lessonApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
