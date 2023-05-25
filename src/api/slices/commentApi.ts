import { createApi } from '@reduxjs/toolkit/query/react';

import { CommentCreateViewModel, LessonCommentViewModel, ProblemCommentViewModel, SolveCommentViewModel } from '../api';
import { commentClient } from '../clients';

export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: () => ({ data: {} }),
    tagTypes: ['LessonComments', 'ProblemComments', 'SolveComments'],
    endpoints: (builder) => ({
        getLessonComments: builder.query<LessonCommentViewModel[], number>({
            queryFn: async (lessonId) => ({ data: await commentClient.getLessonComments(lessonId) }),
            providesTags: ['LessonComments'],
        }),
        getProblemComments: builder.query<ProblemCommentViewModel[], number>({
            queryFn: async (problemId) => ({ data: await commentClient.getProblemComments(problemId) }),
            providesTags: ['ProblemComments'],
        }),
        getSolveComments: builder.query<SolveCommentViewModel[], number>({
            queryFn: async (solveId) => ({ data: await commentClient.getSolveComments(solveId) }),
            providesTags: ['SolveComments'],
        }),
        addLessonComment: builder.mutation<number | null, CommentCreateViewModel>({
            queryFn: async (comment) => ({ data: await commentClient.addLessonComment(comment) }),
            invalidatesTags: ['LessonComments'],
        }),
        addProblemComment: builder.mutation<number | null, CommentCreateViewModel>({
            queryFn: async (comment) => ({ data: await commentClient.addProblemComment(comment) }),
            invalidatesTags: ['ProblemComments'],
        }),
        addSolveComment: builder.mutation<number | null, CommentCreateViewModel>({
            queryFn: async (comment) => ({ data: await commentClient.addSolveComment(comment) }),
            invalidatesTags: ['SolveComments'],
        }),
    }),
});

export const {
    useAddLessonCommentMutation,
    useAddProblemCommentMutation,
    useAddSolveCommentMutation,
    useGetLessonCommentsQuery,
    useGetProblemCommentsQuery,
    useGetSolveCommentsQuery,
} = commentApi;

export default commentApi;
