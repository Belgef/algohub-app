import axios from 'axios';
import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor, getAccessToken } from 'axios-jwt';

import {
    CommentClient,
    LessonClient,
    ProblemClient,
    SolveClient,
    StoreClient,
    TagClient,
    UserClient,
    VoteClient,
} from './api';

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

const baseUrl = 'https://algohubapi.azurewebsites.net';

export const userClient = new UserClient(baseUrl, axiosInstance);
export const problemClient = new ProblemClient(baseUrl, axiosInstance);
export const lessonClient = new LessonClient(baseUrl, axiosInstance);
export const storeClient = new StoreClient(baseUrl, axiosInstance);
export const commentClient = new CommentClient(baseUrl, axiosInstance);
export const solveClient = new SolveClient(baseUrl, axiosInstance);
export const voteClient = new VoteClient(baseUrl, axiosInstance);
export const tagClient = new TagClient(baseUrl, axiosInstance);
