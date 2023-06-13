import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import hljs from 'highlight.js';
import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './api/hooks';
import { setTheme } from './api/slices/appSlice';
import { router } from './router';

hljs.configure({ ignoreUnescapedHTML: true });
document.addEventListener('DOMContentLoaded', ()=>hljs.highlightAll())

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#2c4354'
        }
    },
});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

function App() {
    const dispatch = useAppDispatch();
    dispatch(setTheme((window.localStorage.getItem('theme') ?? 'light') as 'light' | 'dark'));
    const theme = useAppSelector((state) => state.appSlice.theme);
    useEffect(() => hljs.highlightAll(), [theme]);

    return (
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
