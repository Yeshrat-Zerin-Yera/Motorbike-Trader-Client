import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useRole from '../../hooks/useRole';
import Loading from '../../pages/Shared/Loading/Loading';

const BuyerRoute = ({ children }) => {
    // Auth Context
    const { user, loading } = useContext(AuthContext);
    // [userRole, isUserRoleLoading] From useRole
    const [userRole, isUserRoleLoading] = useRole(user?.email);
    // Location
    const location = useLocation();
    // Loading
    if (loading || isUserRoleLoading) {
        return <Loading></Loading>
    }
    // User
    if (user && userRole === 'Buyer') {
        return children;
    }
    return <Navigate to='/signin' state={{ from: location }} replace></Navigate>;
};

export default BuyerRoute;