import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';
import HomePage from './pages/HomePage/HomePage';
import ProblemsPage from './pages/ProblemsPage/ProblemsPage';
import ProblemAddPage from './pages/ProblemAddPage/ProblemAddPage';
import LessonsPage from './pages/LessonsPage/LessonsPage';
import LessonAddPage from './pages/LessonAddPage/LessonAddPage';
import ProblemPage from './pages/ProblemPage/ProblemPage';
import LessonPage from './pages/LessonPage/LessonPage';
import ProblemSolvePage from './pages/ProblemSolvePage/ProblemSolvePage';

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
