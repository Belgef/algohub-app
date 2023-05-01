import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, styled } from '@mui/material';
import { getAccessToken } from 'axios-jwt';
import jwtDecode from 'jwt-decode';
import React from 'react';
import { useGetUserByIdQuery } from '../../api/slices/userApi';
import { STORAGE_BASE_URL } from '../../api/constants';
import useAuth from '../../hooks/useAuth';
import LoginDialog from '../LoginDialog/LoginDialog';

const AuthComponent = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { loggedIn, handleLogin, handleLogout } = useAuth();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const token = getAccessToken();
    const data = (token ? jwtDecode(token) : {}) as { Id: string; Role: string };
    const { data: user } = useGetUserByIdQuery(data?.Id);

    const name = user?.fullName ?? user?.userName;

    return loggedIn ? (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={`Open ${name} settings`}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={name} src={user?.iconName ? STORAGE_BASE_URL + user.iconName : 'notfound'} />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id='menu-appbar'
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>Account</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign='center'>Dashboard</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleCloseUserMenu();
                            handleLogout();
                        }}
                    >
                        <Typography textAlign='center'>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </>
    ) : (
        <>
            <LoginDialog enabled={!loggedIn} onSubmit={async (user) => await handleLogin(user)} />
        </>
    );
};

export default AuthComponent;
