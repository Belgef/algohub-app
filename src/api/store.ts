import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import {
    IAuthTokens,
    TokenRefreshRequest,
    applyAuthTokenInterceptor,
    clearAuthTokens,
    getAccessToken,
} from 'axios-jwt';

import { UserClient } from './api';
import { API_BASE_URL, axiosInstance } from './clients';
import appSlice from './slices/appSlice';
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
        appSlice: appSlice.reducer,
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

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
    const response = await new UserClient(API_BASE_URL)
        .refreshToken({ oldJwtToken: getAccessToken() ?? '', refreshToken })
        .catch(async () => {
            localStorage.removeItem('auth-tokens-development');
            return Promise.reject()
        });

    store.dispatch(userApi.util.invalidateTags(['User']));

    return {
        accessToken: response.token,
        refreshToken: response.refreshToken,
    };
};

applyAuthTokenInterceptor(axiosInstance, { requestRefresh });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
