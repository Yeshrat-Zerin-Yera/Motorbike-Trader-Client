import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useLoaderData, useNavigation } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Loading from '../Shared/Loading/Loading';

const Products = () => {
    // Title
    useTitle('Products');
    // Get Products By Category From Database
    const products = useLoaderData();
    // Navigation
    const navigation = useNavigation();

    // Loading
    if (navigation.state === 'loading') {
        return <Loading></Loading>;
    }

    // If There Is No Seller
    if (products.length === 0) {
        return <h2 className="text-2xl text-center text-accent font-bold my-12">There Is No Product In This Category</h2>
    }

    // Calculate Years Of Use
    const calculateYearsOfUse = product => {
        const purchaseDate = product?.purchaseDate;
        const purchaseYear = purchaseDate.split('-')[0];
        const resellDate = product?.resellDate;
        const resellYear = resellDate.split('-')[0];
        const yearsOfUse = resellYear - purchaseYear;
        return yearsOfUse;
    };

    return (
        <div className='my-12 grid grid-cols-1 md:grid-cols-2 gap-6 mx-6'>
            {
                products.map(product => <div key={product?._id} className="card lg:card-side bg-base-100">
                    <figure className='lg:w-1/2'><img src={product?.img} alt="Album" className='w-full' /></figure>
                    <div className="card-body lg:w-1/2">
                        <h2 className="card-title">{product?.productName}</h2>
                        <p>Location: {product?.location}</p>
                        <p>Resell Price: <b>{product?.resellPrice}$</b></p>
                        <p>Orginal Price: <b>{product?.orginalPrice}$</b></p>
                        <p>Years Of Use: {calculateYearsOfUse(product)} {calculateYearsOfUse(product) > 1 ? 'Years' : 'Year'}</p>
                        <p>Post Date: {product?.resellDate}</p>
                        <p className='flex items-center'>
                            <FaCheckCircle className='mr-2 text-2xl text-blue-500' />
                            <span>Seller: {product?.seller}</span>
                        </p>
                        <p className={product?.status === 'Available' ? 'badge badge-outline badge-accent' : 'badge badge-outline badge-warning'}>{product?.status}</p>
                        <div className="card-actions justify-end">
                            <button className="btn border-none bg-gradient-to-r from-cyan-400 to-blue-500 text-white" disabled={product?.status === 'Sold'}>Book Now</button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default Products;