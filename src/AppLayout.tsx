import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import Book from '@mui/icons-material/Book';
import Info from '@mui/icons-material/Info';
import ContactMail from '@mui/icons-material/ContactMail';
import { Paper, Typography, BottomNavigation, BottomNavigationAction, Container } from '@mui/material';

const AppLayout = () => {
    return (
        <Container disableGutters maxWidth={false} sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Container disableGutters maxWidth={false} sx={{ flexGrow: 1 }}>
                <Outlet />
            </Container>
            <Paper component='footer' elevation={5} sx={{ p: '1.5em', borderRadius: 0, mt: '1em' }}>
                <Typography variant='body2' textAlign='center'>
                    Powered by
                </Typography>
                <Typography variant='h6' textAlign='center'>
                    Hirnyi Mykola Foundation
                </Typography>
                <BottomNavigation showLabels sx={{ background: 'none' }}>
                    <BottomNavigationAction
                        label='Terms of use'
                        icon={<Book />}
                        href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        target='_blank'
                    />
                    <BottomNavigationAction
                        label='About us'
                        icon={<Info />}
                        href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        target='_blank'
                    />
                    <BottomNavigationAction
                        label='Contact us'
                        icon={<ContactMail />}
                        href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        target='_blank'
                    />
                </BottomNavigation>
            </Paper>
        </Container>
    );
};

export default AppLayout;
