import axios from 'axios';
import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor, getAccessToken } from 'axios-jwt';

import { ProblemClient, StoreClient, UserClient } from './api';

export const axiosInstance = axios.create();

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
    const response = await new UserClient().refreshToken({ oldJwtToken: getAccessToken() ?? '', refreshToken });

    return {
        accessToken: response.token,
        refreshToken: response.refreshToken,
    };
};

applyAuthTokenInterceptor(axiosInstance, { requestRefresh });

// axiosInstance.interceptors.request.use((config) => {
//     config.headers.Authorization =  getAccessToken();

//     return config;
// });

axiosInstance.interceptors.response.use((config) => {
    if (config.status !== 200) {
        console.log(config);
    }
    return config;
});

export const userClient = new UserClient(undefined, axiosInstance);
export const problemClient = new ProblemClient(undefined, axiosInstance);
export const storeClient = new StoreClient(undefined, axiosInstance);
