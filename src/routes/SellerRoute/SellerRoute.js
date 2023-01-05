import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useSeller from '../../hooks/userSeller';
import Loading from '../../pages/Shared/Loading/Loading';

const SellerRoute = ({ children }) => {
    // Auth Context
    const { user, loading } = useContext(AuthContext);
    // [isSeller, isSellerLoading] From useSeller
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    // Location
    const location = useLocation();
    // Loading
    if (loading || isSellerLoading) {
        return <Loading></Loading>
    }
    // User
    if (user && isSeller === 'Seller') {
        return children;
    }
    return <Navigate to='/signin' state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;