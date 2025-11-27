import { createBrowserRouter } from 'react-router-dom';
import { FormPage } from './pages/FormPage';
import { ResultPage } from './pages/ResultPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <FormPage />,
    },
    {
        path: '/result',
        element: <ResultPage />,
    },
]);
