import { createApi } from '@reduxjs/toolkit/query/react';

import { SolveCreateViewModel, SolveViewModel } from '../api';
import { solveClient } from '../clients';

export const solveApi = createApi({
    reducerPath: 'solveApi',
    baseQuery: () => ({ data: {} }),
    tagTypes: ['Solves'],
    endpoints: (builder) => ({
        getSolves: builder.query<SolveViewModel[], number>({
            queryFn: async (problemId) => ({ data: await solveClient.get(problemId) }),
            providesTags: ['Solves'],
        }),
        addSolve: builder.mutation<string[] | null, SolveCreateViewModel>({
            queryFn: async (solve) => ({ data: await solveClient.verifyAndAddSolve(solve) }),
            invalidatesTags: ['Solves'],
        }),
        voteForSolve: builder.mutation<number | null, { solveId: number; isUpvote: boolean }>({
            queryFn: async (vote) => ({ data: await solveClient.addSolveVote(vote.solveId, vote.isUpvote) }),
            invalidatesTags: ['Solves'],
        }),
        getVoteForSolve: builder.query<boolean | null, number>({
            queryFn: async (solveId) => ({ data: await solveClient.getSolveVote(solveId) }),
            providesTags: ['Solves'],
        }),
    }),
});

export const { useGetSolvesQuery, useAddSolveMutation, useVoteForSolveMutation, useGetVoteForSolveQuery } = solveApi;

export default solveApi;
