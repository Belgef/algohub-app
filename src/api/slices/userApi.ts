import { createApi } from '@reduxjs/toolkit/query/react';
import { clearAuthTokens, getAccessToken, setAuthTokens } from 'axios-jwt';
import jwtDecode from 'jwt-decode';

import { UserCreateViewModel, UserLoginViewModel, UserViewModel } from '../api';
import { userClient } from '../clients';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: () => ({ data: {} }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        login: builder.mutation<string, UserLoginViewModel>({
            queryFn: async (loginData) => {
                const tokens = await userClient.login(loginData);

                setAuthTokens({
                    accessToken: tokens.token,
                    refreshToken: tokens.refreshToken,
                });

                const { Id: id } = jwtDecode(tokens.token) as { Id: string; Role: string };

                return { data: id };
            },
            invalidatesTags: ['User'],
        }),
        register: builder.mutation<string, UserCreateViewModel>({
            queryFn: async (registerData) => {
                const id = await userClient.register(registerData);

                const tokens = await userClient.login({ ...registerData });

                setAuthTokens({
                    accessToken: tokens.token,
                    refreshToken: tokens.refreshToken,
                });

                return { data: id };
            },
            invalidatesTags: ['User'],
        }),
        getUser: builder.query<UserViewModel | null, void>({
            queryFn: async (_, { dispatch }) => {
                const token = getAccessToken();

                if (!token) {
                    return { data: null };
                }

                const { Id: id } = jwtDecode(token) as { Id: string; Role: string };

                const user = await userClient.getUserById(id);

                return { data: user };
            },
            providesTags: ['User'],
        }),
        getUsers: builder.query<UserViewModel[], void>({
            queryFn: async () => {
                const users = await userClient.getAll();

                return { data: users };
            },
            providesTags: ['User'],
        }),
        logout: builder.mutation<null, null>({
            queryFn: () => {
                clearAuthTokens();

                return { data: null };
            },
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery, useLogoutMutation, useGetUsersQuery } = userApi;

export default userApi;
