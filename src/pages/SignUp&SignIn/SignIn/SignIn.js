import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';

const SignIn = () => {
    // Title
    useTitle('Sign In');
    // Use Form
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    // Use Context
    const { signIn, signInProvider, resetUserPassword } = useContext(AuthContext);
    // Sign In
    const [signInError, setSignInError] = useState('');
    const googleProvider = new GoogleAuthProvider();
    // Navigate
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    // Handle Sign In
    const handleSignIn = data => {
        // Set Sign In Error
        setSignInError('');
        console.log(data);
        signIn(data?.email, data?.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                // Reset Form
                reset();
                // Toast Sign In
                toast.success('Sign In Successfull');
                // Navigate
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                // Set Sign In Error
                setSignInError(error.message);
            })
    };

    // Handle Other Sign In
    const handleOtherSignIn = provider => {
        signInProvider(provider)
            .then(result => {
                const user = result.user;
                console.log(user);
                // Post User To Database
                const dbUser = {
                    name: user?.displayName,
                    email: user?.email,
                    img: user?.photoURL,
                    role: 'Buyer'
                }
                saveUserToDB(dbUser);
                // Toast Sign In
                toast.success('Sign In Successfull');
                // Navigate
                navigate(from, { replace: true });
            })
            .catch(error => console.error(error))
    };

    // Handle Reset User Password
    const handleResetUserPassword = () => {
        const userEmail = watch().email;
        resetUserPassword(userEmail)
            .then(() => {
                // Toast Reset User Password
                toast.success('Password Reset Email Sent');
            })
            .catch(error => {
                console.error(error);
                // Set Reset User Error
                setSignInError(error.message);
            });
    };

    // Post User To Database
    const saveUserToDB = (dbUser) => {
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(dbUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })

    };

    return (
        <div className='p-6 max-w-md mx-auto my-12'>
            <h2 className='text-2xl text-center'>Sign In</h2>
            {/* Form */}
            <form onSubmit={handleSubmit(handleSignIn)}>
                {/* Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" className="input input-bordered" {...register('email', { required: "Email field mustn't be empty" })} />
                    {/* Email Error */}
                    {errors?.email && <span className='text-xs text-error mt-1'>{errors?.email?.message}</span>}
                </div>
                {/* Password */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Password" className="input input-bordered" {...register('password', { required: "Password field mustn't be empty" })} />
                    <div className='flex justify-between'>
                        {/* Password Error */}
                        {errors?.password && <span className='text-xs text-error mt-1'>{errors?.password?.message}</span>}
                        {/* Forgot Password Link */}
                        <label className="label">
                            <Link onClick={handleResetUserPassword} className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                    </div>
                </div>
                {/* Sign In Error */}
                <p className='text-xs mt-1 text-error'>{signInError}</p>
                {/* Submit Button */}
                <div className="form-control mt-6">
                    <button className="btn border-none bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-lg font-normal">Sign In</button>
                </div>
                {/* Sign In Link */}
                <div className='text-center mt-3'>
                    <span>New To Best Care?</span>
                    <Link to='/signup' className='text-blue-500 link link-hover ml-1'>Sign Up</Link>
                </div>
                {/* Divider */}
                <div className="divider text-lg sm:my-8">OR</div>
                {/* Google Sign In Button */}
                <div className="form-control mt-6">
                    <button onClick={() => handleOtherSignIn(googleProvider)} className="btn btn-outline border-blue-500 text-blue-500 text-lg font-normal hover:border-none hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:text-white">Continue With Google</button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;