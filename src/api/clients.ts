import axios from 'axios';

import {
    CommentClient,
    LessonClient,
    ProblemClient,
    SolveClient,
    StoreClient,
    TagClient,
    UserClient,
    VoteClient,
} from './api';

export const API_BASE_URL = 'https://algohubapi.azurewebsites.net';

export const axiosInstance = axios.create();

export const userClient = new UserClient(API_BASE_URL, axiosInstance);
export const problemClient = new ProblemClient(API_BASE_URL, axiosInstance);
export const lessonClient = new LessonClient(API_BASE_URL, axiosInstance);
export const storeClient = new StoreClient(API_BASE_URL, axiosInstance);
export const commentClient = new CommentClient(API_BASE_URL, axiosInstance);
export const solveClient = new SolveClient(API_BASE_URL, axiosInstance);
export const voteClient = new VoteClient(API_BASE_URL, axiosInstance);
export const tagClient = new TagClient(API_BASE_URL, axiosInstance);
