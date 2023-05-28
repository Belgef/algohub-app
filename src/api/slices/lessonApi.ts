import { createApi } from '@reduxjs/toolkit/query/react';

import { LessonCreateViewModel, LessonViewModel } from '../api';
import { lessonClient, voteClient } from '../clients';

export const lessonApi = createApi({
    reducerPath: 'lessonApi',
    baseQuery: () => ({ data: {} }),
    tagTypes: ['Lessons', 'Lesson', 'DeletedLessons'],
    endpoints: (builder) => ({
        getLessons: builder.query<LessonViewModel[], void>({
            queryFn: async () => ({ data: await lessonClient.getAll() }),
            providesTags: ['Lessons'],
        }),
        getDeletedLessons: builder.query<LessonViewModel[], void>({
            queryFn: async () => ({ data: await lessonClient.getDeleted() }),
            providesTags: ['DeletedLessons'],
        }),
        getLessonById: builder.query<LessonViewModel, number>({
            queryFn: async (id) => ({ data: await lessonClient.get(id) }),
            providesTags: ['Lesson'],
        }),
        addLesson: builder.mutation<number | null, LessonCreateViewModel>({
            queryFn: async (lesson) => ({ data: await lessonClient.addLesson(lesson) }),
            invalidatesTags: ['Lesson', 'Lessons'],
        }),
        voteForLesson: builder.mutation<number | null, { lessonId: number; isUpvote: boolean }>({
            queryFn: async (vote) => ({ data: await voteClient.addLessonVote(vote.lessonId, vote.isUpvote) }),
            invalidatesTags: ['Lesson', 'Lessons'],
        }),
        getVoteForLesson: builder.query<boolean | null, number>({
            queryFn: async (lessonId) => ({ data: await voteClient.getLessonVote(lessonId) }),
            providesTags: ['Lesson', 'Lessons'],
        }),
        deleteLesson: builder.mutation<boolean, number>({
            queryFn: async (lessonId) => ({ data: (await lessonClient.deleteLesson(lessonId)) }),
            invalidatesTags: ['DeletedLessons', 'Lessons', 'Lesson'],
        }),
        retrieveLesson: builder.mutation<boolean, number>({
            queryFn: async (lessonId) => ({ data: (await lessonClient.retrieveLesson(lessonId)) }),
            invalidatesTags: ['DeletedLessons', 'Lessons', 'Lesson'],
        }),
    }),
});

export const {
    useGetLessonByIdQuery,
    useGetLessonsQuery,
    useAddLessonMutation,
    useVoteForLessonMutation,
    useGetVoteForLessonQuery,
    useGetDeletedLessonsQuery,
    useDeleteLessonMutation,
    useRetrieveLessonMutation,
} = lessonApi;

export default lessonApi;
