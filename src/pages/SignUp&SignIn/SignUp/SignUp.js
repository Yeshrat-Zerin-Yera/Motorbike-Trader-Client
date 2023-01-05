import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';

const SignUp = () => {
    // Use Title
    useTitle('Sign Up');
    // Use Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // Use Context
    const { createUser, updateUser, signInProvider } = useContext(AuthContext);
    // Sign Up
    const [signUpError, setSignUpError] = useState('');
    const googleProvider = new GoogleAuthProvider();
    // Navigate
    const navigate = useNavigate();

    // Handle Sign Up
    const handleSignUp = data => {
        // Set Sign Up Error
        setSignUpError('');
        console.log(data);
        createUser(data?.email, data?.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                // Update User
                const userInfo = {
                    displayName: data?.name
                };
                updateUser(userInfo)
                    .then(() => {
                        // Post User To Database
                        const dbUser = {
                            name: data?.name,
                            email: data?.email,
                            img: data?.photoURL,
                            role: data?.role
                        }
                        saveUserToDB(dbUser);
                        // Toast Sign Up
                        toast.success('Sign Up Successfull');
                        // Navigate
                        navigate('/signin');
                    })
                    .catch(error => console.error(error.message))
                // Reset Form
                reset();
            })
            .catch(error => {
                console.error(error);
                // Set Sign Up Error
                setSignUpError(error.message);
            })
    };

    // Handle Other Sign Up
    const handleOtherSignUp = provider => {
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
                // Toast Sign Up
                toast.success('Sign Up Successfull');
                // Navigate
                navigate('/signin');
            })
            .catch(error => console.error(error))
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
            <h2 className='text-2xl text-center'>Sign Up</h2>
            {/* Form */}
            <form onSubmit={handleSubmit(handleSignUp)}>
                {/* Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" className="input input-bordered" {...register('name', { required: "Name field mustn't be empty" })} />
                    {/* Name Error */}
                    {errors?.name && <span className='text-xs text-error mt-1'>{errors?.name?.message}</span>}
                </div>
                {/* Role */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Role</span>
                    </label>
                    <select className="select select-bordered w-full" {...register('role')}>
                        <option selected>Buyer</option>
                        <option>Seller</option>
                    </select>
                </div>
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
                    <input type="password" placeholder="Password" className="input input-bordered" {...register('password', { required: "Password field mustn't be empty", minLength: { value: 6, message: 'Password must be 6 characters or longer' } })} />
                    {/* Password Error */}
                    {errors?.password && <span className='text-xs text-error mt-1'>{errors?.password?.message}</span>}
                </div>
                {/* Sign Up Error */}
                <p className="text-xs mt-1 text-error">{signUpError}</p>
                {/* Submit Button */}
                <div className="form-control mt-6">
                    <button className="btn border-none bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-lg font-normal">Sign Up</button>
                </div>
                {/* Sign In Link */}
                <div className='text-center mt-3'>
                    <span>Already Have An Account?</span>
                    <Link to='/signin' className='text-blue-500 link link-hover ml-1'>Sign In</Link>
                </div>
                {/* Divider */}
                <div className="divider text-lg sm:my-8">OR</div>
                {/* Google Sign Up Button */}
                <div className="form-control mt-6">
                    <button onClick={() => handleOtherSignUp(googleProvider)} className="btn btn-outline border-blue-500 text-blue-500 text-lg font-normal hover:border-none hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500 hover:text-white">Continue With Google</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;