import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userApi from './slices/userApi';
import problemApi from './slices/problemApi';

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [problemApi.reducerPath]: problemApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(problemApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
