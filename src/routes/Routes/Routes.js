import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../layouts/Main/DashboardLayout/DashboardLayout';
import Main from '../../layouts/Main/Main';
import Blog from '../../pages/Blog/Blog';
import AddAProduct from '../../pages/Dashboard/AddAProduct/AddAProduct';
import MyProducts from '../../pages/Dashboard/MyProducts/MyProducts';
import Home from '../../pages/Home/Home/Home';
import DisplayError from '../../pages/Shared/DisplayError/DisplayError';
import SignIn from '../../pages/SignUp&SignIn/SignIn/SignIn';
import SignUp from '../../pages/SignUp&SignIn/SignUp/SignUp';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import SellerRoute from '../SellerRoute/SellerRoute';

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
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard/addaproduct',
                element: <SellerRoute><AddAProduct></AddAProduct></SellerRoute>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            // {
            //     path: '/dashboard',
            //     element: 
            // },
            // {
            //     path: '/dashboard',
            //     element: 
            // }
        ]
    }
]);

export default router;