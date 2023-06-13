import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import hljs from 'highlight.js';

import { UserViewModel } from '../api';

type AppState = {
    theme: string;
    user: UserViewModel | null;
};

const initialState: AppState = {
    theme: window.localStorage.getItem('theme') ?? 'light',
    user: null,
};

export const appSlice = createSlice({
    name: 'appSlice',
    initialState: initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
            state.theme = action.payload;
            document?.querySelector(`link[title="${action.payload}"]`)?.removeAttribute('disabled');
            document
                ?.querySelector(`link[title="${action.payload === 'dark' ? 'light' : 'dark'}"]`)
                ?.setAttribute('disabled', 'true');
            hljs.highlightAll();
            window.localStorage.setItem('theme', action.payload);
        },
    },
});

export const { setTheme } = appSlice.actions;

export default appSlice;
