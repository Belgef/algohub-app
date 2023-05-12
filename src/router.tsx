import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';
import HomePage from './pages/HomePage/HomePage';
import ProblemsPage from './pages/ProblemsPage/ProblemsPage';
import ProblemAddPage from './pages/ProblemAddPage/ProblemAddPage';

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
                ],
            },
        ],
    },
]);
