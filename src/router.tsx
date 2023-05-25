import { createBrowserRouter } from 'react-router-dom';

import AppLayout from './AppLayout';
import HomePage from './pages/HomePage/HomePage';
import LessonAddPage from './pages/LessonAddPage/LessonAddPage';
import LessonPage from './pages/LessonPage/LessonPage';
import LessonsPage from './pages/LessonsPage/LessonsPage';
import ProblemAddPage from './pages/ProblemAddPage/ProblemAddPage';
import ProblemPage from './pages/ProblemPage/ProblemPage';
import ProblemSolvePage from './pages/ProblemSolvePage/ProblemSolvePage';
import ProblemsPage from './pages/ProblemsPage/ProblemsPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: 'problems',
                children: [
                    {
                        path: '',
                        element: <ProblemsPage />,
                    },
                    {
                        path: 'add',
                        element: <ProblemAddPage />,
                    },
                    {
                        path: ':id',
                        children: [
                            { path: '', element: <ProblemPage /> },
                            { path: 'solve', element: <ProblemSolvePage /> },
                        ],
                    },
                ],
            },
            {
                path: 'lessons',
                children: [
                    {
                        path: '',
                        element: <LessonsPage />,
                    },
                    {
                        path: 'add',
                        element: <LessonAddPage />,
                    },
                    {
                        path: ':id',
                        element: <LessonPage />,
                    },
                ],
            },
        ],
    },
]);
