import { problemClient } from '../clients';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ProblemViewModel } from '../api';

export const problemApi = createApi({
    reducerPath: 'problemApi',
    baseQuery: () => ({ data: {} }),
    tagTypes: ['Problems'],
    endpoints: (builder) => ({
        getProblems: builder.query<ProblemViewModel[], void>({
            queryFn: async () => ({ data: await problemClient.getAll() }),
            providesTags: ['Problems'],
        }),
    }),
});

export const { useGetUserByIdQuery } = problemApi;

export default userApi;
