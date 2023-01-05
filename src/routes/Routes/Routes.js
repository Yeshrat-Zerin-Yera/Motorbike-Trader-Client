import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../../layouts/Main/Main';
import Blog from '../../pages/Blog/Blog';
import Home from '../../pages/Home/Home/Home';
import DisplayError from '../../pages/Shared/DisplayError/DisplayError';
import SignIn from '../../pages/SignUp&SignIn/SignIn/SignIn';
import SignUp from '../../pages/SignUp&SignIn/SignUp/SignUp';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/signin',
                element: <SignIn></SignIn>
            },
            {
                path: '/blog',
                element: <Blog></Blog>,
                loader: () => fetch('http://localhost:5000/blogs')
            }
        ]
    }
]);

export default router;