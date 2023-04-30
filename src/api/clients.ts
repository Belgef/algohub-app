import axios from 'axios';
import {
    IAuthTokens,
    TokenRefreshRequest,
    applyAuthTokenInterceptor,
    getAccessToken,
} from 'axios-jwt';
import { UserClient } from './api';

export const axiosInstance = axios.create();
export const userClient = new UserClient(undefined, axiosInstance);

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
    const response = await new UserClient().refreshToken({ oldJwtToken: getAccessToken() ?? '', refreshToken });

    return {
        accessToken: response.token,
        refreshToken: response.refreshToken,
    };
};

applyAuthTokenInterceptor(axiosInstance, { requestRefresh });
