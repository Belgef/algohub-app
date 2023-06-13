import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import React from 'react';

import { STORAGE_BASE_URL } from '../../api/constants';
import { useLogoutMutation } from '../../api/slices/userApi';
import useAuthorization from '../../hooks/useAuthorization';
import LoginDialog from '../LoginDialog/LoginDialog';
import RegisterDialog from '../RegisterDialog/RegisterDialog';

const AuthComponent = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [logout] = useLogoutMutation();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const user = useAuthorization();

    const name = user?.fullName ?? user?.userName ?? 'deleted';

    return (
        <>
            <LoginDialog mode='md' />
            <RegisterDialog mode='md' />
            <Box sx={{ flexGrow: 0, display: user ? 'block' : 'none' }}>
                <Tooltip title={`Open ${name} settings`}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={name} src={user?.iconName ? STORAGE_BASE_URL + user.iconName : 'deleted'} />
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
                            logout(null);
                        }}
                    >
                        <Typography textAlign='center'>Logout</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </>
    );
};

export default AuthComponent;
