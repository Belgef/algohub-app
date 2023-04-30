import { setAuthTokens, clearAuthTokens } from 'axios-jwt';
import { userClient } from './clients';
import { UserLoginViewModel } from './api';

export const login = async (user: UserLoginViewModel) => {
    const response = await userClient.login(user).catch((error) => undefined);

    if (!response) {
        return false;
    }

    setAuthTokens({
        accessToken: response.token,
        refreshToken: response.refreshToken,
    });

    return true;
};

export const logout = () => clearAuthTokens();
