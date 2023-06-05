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

const baseUrl = undefined;//'https://algohubapi.azurewebsites.net';

export const axiosInstance = axios.create();

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
    const response = await new UserClient(baseUrl).refreshToken({ oldJwtToken: getAccessToken() ?? '', refreshToken });

    return {
        accessToken: response.token,
        refreshToken: response.refreshToken,
    };
};

applyAuthTokenInterceptor(axiosInstance, { requestRefresh });

export const userClient = new UserClient(baseUrl, axiosInstance);
export const problemClient = new ProblemClient(baseUrl, axiosInstance);
export const lessonClient = new LessonClient(baseUrl, axiosInstance);
export const storeClient = new StoreClient(baseUrl, axiosInstance);
export const commentClient = new CommentClient(baseUrl, axiosInstance);
export const solveClient = new SolveClient(baseUrl, axiosInstance);
export const voteClient = new VoteClient(baseUrl, axiosInstance);
export const tagClient = new TagClient(baseUrl, axiosInstance);
