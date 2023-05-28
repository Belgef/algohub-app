import { createApi } from '@reduxjs/toolkit/query/react';

import { LessonCreateViewModel, LessonViewModel } from '../api';
import { lessonClient, voteClient } from '../clients';

export const lessonApi = createApi({
    reducerPath: 'lessonApi',
    baseQuery: () => ({ data: {} }),
    tagTypes: ['Lessons', 'Lesson'],
    endpoints: (builder) => ({
        getLessons: builder.query<LessonViewModel[], void>({
            queryFn: async () => ({ data: await lessonClient.getAll() }),
            providesTags: ['Lessons'],
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
            providesTags: ['Lesson'],
        }),
    }),
});

export const { useGetLessonByIdQuery, useGetLessonsQuery, useAddLessonMutation, useVoteForLessonMutation, useGetVoteForLessonQuery } = lessonApi;

export default lessonApi;
