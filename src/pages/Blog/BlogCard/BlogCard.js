import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    // Get { _id, img, title, details } From Blog
    const { _id, img, title, details } = blog;

    return (
        <div className="card w-full bg-base-100 shadow-2xl">
            {/* Blog Image */}
            <figure><img src={img} alt="" /></figure>
            {/* Blog Details */}
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{details?.length > 100 ? details.slice(0, 100) : details}...</p>
                {/* Details Button */}
                <div className="card-actions justify-end">
                    <Link to={`/blogs/${_id}`} className="btn border-none bg-gradient-to-r from-cyan-400 to-blue-500 text-white">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;