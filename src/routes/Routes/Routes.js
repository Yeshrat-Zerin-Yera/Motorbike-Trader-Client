import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout/DashboardLayout';
import Main from '../../layouts/Main/Main';
import Blog from '../../pages/Blog/Blog/Blog';
import BlogDetails from '../../pages/Blog/BlogDetails/BlogDetails';
import AddAProduct from '../../pages/Dashboard/AddAProduct/AddAProduct';
import AllBuyers from '../../pages/Dashboard/AllBuyers/AllBuyers';
import AllSellers from '../../pages/Dashboard/AllSellers/AllSellers';
import MyOrders from '../../pages/Dashboard/MyOrders/MyOrders';
import MyProducts from '../../pages/Dashboard/MyProducts/MyProducts';
import Payment from '../../pages/Dashboard/Payment/Payment';
import ReportedItems from '../../pages/Dashboard/ReportedItems/ReportedItems';
import Home from '../../pages/Home/Home/Home';
import Products from '../../pages/Products/Products/Products';
import DisplayError from '../../pages/Shared/DisplayError/DisplayError';
import SignIn from '../../pages/SignUp&SignIn/SignIn/SignIn';
import SignUp from '../../pages/SignUp&SignIn/SignUp/SignUp';
import AdminRoute from '../AdminRoute/AdminRoute';
import BuyerRoute from '../BuyerRoute/BuyerRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import SellerRoute from '../SellerRoute/SellerRoute';

const router = createBrowserRouter([
    // Main
    {
        path: '/',
        element: <Main></Main>,
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
            },
            {
                path: '/blogs/:id',
                element: <BlogDetails></BlogDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/blogs/${params.id}`)
            },
            {
                path: '/categories/:id',
                element: <PrivateRoute><Products></Products></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/categories/${params?.id}`)
            }
        ]
    },
    // Dashboard
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard/addaproduct',
                element: <SellerRoute><AddAProduct></AddAProduct></SellerRoute>
            },
            {
                path: '/dashboard/myproducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/myorders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/allsellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/reporteditems',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`http://localhost:5000/bookings/payment/${params?.id}`)
            }
        ]
    },
    {
        path: '*',
        element: <DisplayError></DisplayError>
    }
]);

export default router;