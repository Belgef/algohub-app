import { clearAuthTokens, isLoggedIn, setAuthTokens } from 'axios-jwt';
import { useEffect, useState } from 'react';
import { UserLoginViewModel } from '../api/api';
import { userClient } from '../api/clients';

const useAuth = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const userIsLoggedIn = isLoggedIn();
        setLoggedIn(userIsLoggedIn);
    }, []);

    const handleLogin = async (user: UserLoginViewModel) => {
        const response = await userClient.login(user).catch(() => undefined);

        if (!response) {
            return false;
        }

        setAuthTokens({
            accessToken: response.token,
            refreshToken: response.refreshToken,
        });

        setLoggedIn(true);

        return true;
    };

    const handleLogout = () => {
        clearAuthTokens();
        setLoggedIn(false);
    }

    return { loggedIn, handleLogin, handleLogout };
};

export default useAuth;