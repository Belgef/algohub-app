import { createApi } from '@reduxjs/toolkit/query/react';

import { ProblemCreateViewModel, ProblemViewModel } from '../api';
import { problemClient } from '../clients';

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
            queryFn: async (id) => ({ data: await problemClient.get(id) }),
            providesTags: ['Problem'],
        }),
        addProblem: builder.mutation<number | null, ProblemCreateViewModel>({
            queryFn: async (problem) => ({ data: await problemClient.addProblem(problem) }),
            invalidatesTags: ['Problem', 'Problems'],
        }),
    }),
});

export const { useGetProblemByIdQuery, useGetProblemsQuery, useAddProblemMutation } = problemApi;

export default problemApi;
