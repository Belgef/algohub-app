import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { useAppDispatch, useAppSelector } from '../../api/hooks';
import { setTheme } from '../../api/slices/appSlice';
import AuthComponent from '../AuthComponent/AuthComponent';
import LoginDialog from '../LoginDialog/LoginDialog';
import RegisterDialog from '../RegisterDialog/RegisterDialog';

const pages = ['Problems', 'Lessons'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state) => state.appSlice.theme);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component={NavLink}
                        to='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'sans-serif',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ALGOHUB
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu} component={NavLink} to={page}>
                                    <Typography textAlign='center' color='white'>
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                            <LoginDialog mode='xs' onClick={handleCloseNavMenu} />
                            <RegisterDialog mode='xs' onClick={handleCloseNavMenu} />
                        </Menu>
                    </Box>
                    <Typography
                        variant='h5'
                        noWrap
                        component={NavLink}
                        to='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            fontFamily: 'sans-serif',
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ALGOHUB
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 1, color: 'white', display: 'block' }}
                                component={NavLink}
                                to={'/' + page}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <DarkModeSwitch
                        style={{ marginRight: 8 }}
                        checked={theme === 'dark'}
                        onChange={() => dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'))}
                        moonColor='white'
                        sunColor='white'
                    />
                    <AuthComponent />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
