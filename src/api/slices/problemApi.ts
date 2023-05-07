import { problemClient } from '../clients';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ProblemViewModel } from '../api';

export const problemApi = createApi({
    reducerPath: 'problemApi',
    baseQuery: () => ({ data: {} }),
    tagTypes: ['Problems', 'Problem'],
    endpoints: (builder) => ({
        getProblems: builder.query<ProblemViewModel[], void>({
            queryFn: async () => ({ data: await problemClient.getAll() }),
            providesTags: ['Problems'],
        }),
        getProblemById: builder.query<ProblemViewModel, number>({
            queryFn: async (id: number) => ({ data: await problemClient.get(id) }),
            providesTags: ['Problem'],
        }),
    }),
});

export const { useGetProblemByIdQuery, useGetProblemsQuery } = problemApi;

export default problemApi;
