import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import Loading from '../../pages/Shared/Loading/Loading';

const PrivateRoute = ({ children }) => {
    // Auth Context
    const { user, loading } = useContext(AuthContext);
    // Location
    const location = useLocation();

    // Loading
    if (loading) {
        return <Loading></Loading>
    }

    // If User Present User
    if (user) {
        return children;
    }
    return <Navigate to='/signin' state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;