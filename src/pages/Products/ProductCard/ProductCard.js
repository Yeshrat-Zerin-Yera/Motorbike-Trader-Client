import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ProductCard = ({ product, calculateYearsOfUse, setBookingProduct }) => {
    return (
        <div className="card lg:card-side bg-base-100 shadow-2xl rounded-none">
            {/* Product Image */}
            <figure className='lg:w-1/2'>
                <img src={product?.img} alt="" className='w-full' />
            </figure>
            {/* Product Details */}
            <div className="card-body lg:w-1/2">
                {/* Product Name */}
                <h2 className="card-title">{product?.productName}</h2>
                {/* Buyer Location */}
                <p>Location: {product?.location}</p>
                {/* Resell Price */}
                <p>Resell Price: <b>{product?.resellPrice}$</b></p>
                {/* Orginal Price */}
                <p>Orginal Price: <b>{product?.orginalPrice}$</b></p>
                {/* Years Of Use */}
                <p>Years Of Use: {calculateYearsOfUse(product)} {calculateYearsOfUse(product) > 1 ? 'Years' : 'Year'}</p>
                {/* Post For Resell Date */}
                <p>Post Date: {product?.resellDate}</p>
                {/* Seller Name */}
                <p className='flex items-center'>
                    <FaCheckCircle className='mr-2 text-2xl text-blue-500' />
                    <span>Seller: {product?.seller}</span>
                </p>
                {/* Product Status */}
                <p className={product?.status === 'Available' ? 'badge badge-outline badge-accent' : 'badge badge-outline badge-warning'}>{product?.status}</p>
                {/* Book Now Button */}
                <div className="card-actions justify-end">
                    {/* The Button To Open Modal */}
                    <label htmlFor="bookingModal" onClick={() => setBookingProduct(product)} className="btn border-none bg-gradient-to-r from-cyan-400 to-blue-500 text-white" disabled={product?.status === 'Sold'} product={product}>Book Now</label>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;