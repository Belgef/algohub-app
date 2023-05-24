import { createApi } from '@reduxjs/toolkit/query/react';

import { LessonCreateViewModel, LessonViewModel } from '../api';
import { lessonClient } from '../clients';

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
    }),
});

export const { useGetLessonByIdQuery, useGetLessonsQuery, useAddLessonMutation } = lessonApi;

export default lessonApi;
