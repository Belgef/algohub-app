import { userClient } from '../clients';
import { createApi } from '@reduxjs/toolkit/query/react';
import { UserViewModel } from '../api';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: () => ({ data: {} }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        getUserById: builder.query<UserViewModel, string>({
            queryFn: async (userId: string) => ({ data: await userClient.getUserById(userId) }),
            providesTags: ['User'],
        }),
    }),
});

export const { useGetUserByIdQuery } = userApi;

export default userApi;
