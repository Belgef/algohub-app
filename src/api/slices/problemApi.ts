import { createApi } from '@reduxjs/toolkit/query/react';

import { ProblemCreateViewModel, ProblemViewModel } from '../api';
import { problemClient, voteClient } from '../clients';

export const problemApi = createApi({
    reducerPath: 'problemApi',
    baseQuery: () => ({ data: {} }),
    tagTypes: ['Problems', 'Problem', 'DeletedProblems'],
    endpoints: (builder) => ({
        getProblems: builder.query<ProblemViewModel[], void>({
            queryFn: async () => ({ data: await problemClient.getAll() }),
            providesTags: ['Problems'],
        }),
        getDeletedProblems: builder.query<ProblemViewModel[], void>({
            queryFn: async () => ({ data: await problemClient.getDeleted() }),
            providesTags: ['DeletedProblems'],
        }),
        getProblemById: builder.query<ProblemViewModel, number>({
            queryFn: async (id) => ({ data: await problemClient.get(id) }),
            providesTags: ['Problem'],
        }),
        addProblem: builder.mutation<number | null, ProblemCreateViewModel>({
            queryFn: async (problem) => ({ data: await problemClient.addProblem(problem) }),
            invalidatesTags: ['Problem', 'Problems'],
        }),
        voteForProblem: builder.mutation<number | null, { problemId: number; isUpvote: boolean }>({
            queryFn: async (vote) => ({ data: await voteClient.addProblemVote(vote.problemId, vote.isUpvote) }),
            invalidatesTags: ['Problem', 'Problems'],
        }),
        getVoteForProblem: builder.query<boolean | null, number>({
            queryFn: async (problemId) => ({ data: await voteClient.getProblemVote(problemId) }),
            providesTags: ['Problem', 'Problems'],
        }),
        deleteProblem: builder.mutation<boolean, number>({
            queryFn: async (problemId) => ({ data: await problemClient.deleteProblem(problemId) }),
            invalidatesTags: ['DeletedProblems', 'Problems', 'Problem'],
        }),
        retrieveProblem: builder.mutation<boolean, number>({
            queryFn: async (problemId) => ({ data: await problemClient.retrieveProblem(problemId) }),
            invalidatesTags: ['DeletedProblems', 'Problems', 'Problem'],
        }),
    }),
});

export const {
    useGetProblemByIdQuery,
    useGetProblemsQuery,
    useAddProblemMutation,
    useVoteForProblemMutation,
    useGetVoteForProblemQuery,
    useGetDeletedProblemsQuery,
    useDeleteProblemMutation,
    useRetrieveProblemMutation,
} = problemApi;

export default problemApi;
