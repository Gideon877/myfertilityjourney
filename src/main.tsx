import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from './App';
import Layout from './layouts/dashboard';
import DashboardPage from './pages';
import SignInPage from './pages/signin';
import ProfilePage from './pages/profile';
import UsersPage from './pages/users';
import PatientsPage from './pages/patients';
import LogsPage from './pages/logs';

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: '/',
                Component: Layout,
                children: [
                    {
                        path: '',
                        Component: DashboardPage,
                    },
                    {
                        path: 'profile',
                        Component: ProfilePage,
                    },
                    {
                        path: 'users',
                        Component: UsersPage,
                    },
                    {
                        path: 'patients',
                        Component: PatientsPage,
                    },
                    {
                        path: 'logs',
                        Component: LogsPage,
                    },
                ],
            },
            {
                path: '/sign-in',
                Component: SignInPage,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);