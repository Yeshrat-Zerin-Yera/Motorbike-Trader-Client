import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';

const AdvertisedProducts = () => {
    // Get All Advertised Products From Database
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch('https://motorbike-trader-server.vercel.app/products/advertised', {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    });
    console.log(products);

    // Loading
    if (isLoading) {
        return <Loading></Loading>;
    }

    // If There Is No Advertised Products
    if (products.length === 0) {
        return;
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
        <div className='mt-12 mx-6'>
            {/* Advertised Products Title */}
            < h4 className="text-2xl font-bold text-center text-accent mb-6">Advertised Products</h4 >
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {
                    products.map(product => <div key={product?._id} className="card w-full bg-base-100 shadow-xl image-full">
                        <figure><img src={product?.img} alt="" /></figure>
                        <div className="card-body">
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
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default AdvertisedProducts;