import React, { useContext } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const DisplayError = () => {
    const error = useRouteError();
    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        logOut()
            .then(() => {
                navigate('/signin');
            })
            .catch(error => console.error(error))
    };

    return (
        <div className='h-[80vh] flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-bold mt-6'>😥Oops!</h1>
            <p className='my-6'>Sorry, an unexpected error has occoured.</p>
            <i>{error?.statusText || error?.message}</i>
            {
                (error?.statusText !== 'Not Found') ? <>
                    <p className='my-6'>Sign Out And Sign In Again And Reload The Page</p>
                    <button onClick={handleSignOut} className='btn btn-primary text-white'>Sign Out</button>
                </>
                    : <span></span>
            }
        </div>
    );
};

export default DisplayError;