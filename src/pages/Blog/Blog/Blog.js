import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';
import BlogCard from '../BlogCard/BlogCard';

const Blog = () => {
    // Title
    useTitle('Blog');
    // Set Blogs
    const [blogs, setBlogs] = useState([]);
    // Set Loading
    const [loading, setLoading] = useState(true);

    // Get Blogs From Database
    useEffect(() => {
        axios.get('http://localhost:5000/blogs')
            .then(data => {
                // Set Blogs
                setBlogs(data.data);
                // Set Loading
                setLoading(false);
            })
    }, []);

    // Loading
    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 xl:gap-24 my-12 mx-3'>
            {
                blogs.map(blog => <BlogCard key={blog?._id} blog={blog}></BlogCard>)
            }
        </div>
    );
};

export default Blog;