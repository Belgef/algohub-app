import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { userClient } from '../../api/clients';
import { STORAGE_BASE_URL } from '../../api/constants';
import useAuth from '../../hooks/useAuth';
import useAuthorization from '../../hooks/useAuthorization';
import LoginDialog from '../LoginDialog/LoginDialog';
import RegisterDialog from '../RegisterDialog/RegisterDialog';

const AuthComponent = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const { loggedIn, handleLogin, handleLogout } = useAuth();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    
    const user = useAuthorization();

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
            <RegisterDialog
                enabled={!loggedIn}
                onSubmit={async (user) => await userClient.register(user) }
            />
        </>
    );
};

export default AuthComponent;
