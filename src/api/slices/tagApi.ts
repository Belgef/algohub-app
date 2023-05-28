import { createApi } from '@reduxjs/toolkit/query/react';

import { tagClient } from '../clients';

export const tagApi = createApi({
    reducerPath: 'tagApi',
    baseQuery: () => ({ data: {} }),
    endpoints: (builder) => ({
        getTags: builder.query<string[], void>({
            queryFn: async () => ({ data: await tagClient.getAllTags() }),
        }),
        getLessonTags: builder.query<string[], number>({
            queryFn: async (lessonId) => ({ data: await tagClient.getLessonTags(lessonId) }),
        }),
        getProblemTags: builder.query<string[], number>({
            queryFn: async (problemId) => ({ data: await tagClient.getProblemTags(problemId) }),
        }),
    }),
});

export const { useGetLessonTagsQuery, useGetProblemTagsQuery, useGetTagsQuery } = tagApi;

export default tagApi;
