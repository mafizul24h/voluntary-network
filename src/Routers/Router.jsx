import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home/Home/Home';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Login/Register';
import Donation from '../Pages/Home/Donation/Donation';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../Layout/Dashboard';
import AddEvent from '../Admin/AddEvent/AddEvent';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'donation',
                element: <PrivateRoute><Donation /></PrivateRoute>
            }
        ]
    },
    {
        path: 'admin',
        element: <Dashboard/>,
        children: [
            {
                path: 'addEvent',
                element: <AddEvent />
            }
        ]
    }
]);

export default router;