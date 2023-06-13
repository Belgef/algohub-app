import ContactMail from '@mui/icons-material/ContactMail';
import GitHubIcon from '@mui/icons-material/GitHub';
import Info from '@mui/icons-material/Info';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';

const AppLayout = () => {
    return (
        <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Container disableGutters maxWidth={false} sx={{ flexGrow: 1 }}>
                <Outlet />
            </Container>
            <Paper component='footer' elevation={5} sx={{ p: '1.5em', borderRadius: 0, mt: '1em' }}>
                <Typography variant='body2' textAlign='center'>
                    Created as a part of
                </Typography>
                <Typography variant='h6' textAlign='center'>
                    Lviv National Polytechnic University Diploma
                </Typography>
                <BottomNavigation showLabels sx={{ background: 'none' }}>
                    <BottomNavigationAction
                        label='GitHub'
                        icon={<GitHubIcon />}
                        href='https://github.com/Belgef?tab=repositories'
                        target='_blank'
                    />
                    <BottomNavigationAction
                        label='About us'
                        icon={<Info />}
                        href='https://lpnu.ua/en'
                        target='_blank'
                    />
                    <BottomNavigationAction
                        label='Contact us'
                        icon={<ContactMail />}
                        href='mailto:girnyimykola@gmail.com'
                    />
                </BottomNavigation>
            </Paper>
            <Typography component='div' sx={{
                position: 'fixed',
                height: '100%',
                width: '100%',
                zIndex: -100,
                backgroundImage: 'url(/background.png)',
                backgroundSize: 'cover'
            }} />
        </Container>
    );
};

export default AppLayout;
