import React from 'react';
import LoginModalButton from '../../components/LoginModalButton/LoginModalButton';
import { isLoggedIn } from 'axios-jwt';
import { Button } from '@mui/material';
import { logout } from '../../api/login';

const HomePage = () => {
    return (
        <>
            <h1>HomePage</h1>
            {isLoggedIn() ? (
                <Button
                    onClick={() => {
                        logout();
                        window.location.reload();
                    }}
                >
                    Logout
                </Button>
            ) : (
                <LoginModalButton />
            )}
        </>
    );
};

export default HomePage;
