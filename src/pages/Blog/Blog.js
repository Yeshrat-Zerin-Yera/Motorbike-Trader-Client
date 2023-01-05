import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loading from '../Shared/Loading/Loading';

const Blog = () => {
    // Get Blogs From Database
    const blogs = useLoaderData();
    // Navigation
    const navigation = useNavigation();

    // Loading
    if (navigation.state === 'loading') {
        return <Loading></Loading>;
    }

    return (
        <div className='my-12 grid grid-cols-1 gap-6 mx-3'>
            {
                blogs.map(blog => <div key={blog?._id} className='mb-6'>
                    <img src={blog?.img} alt="" className='w-full h-80 lg:h-[600px]' />
                    <h2 className='text-2xl lg:text-4xl font-bold my-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500'>{blog?.title}</h2>
                    <p className='text-blue-900'>{blog?.details}</p>
                </div>)
            }
        </div>
    );
};

export default Blog;