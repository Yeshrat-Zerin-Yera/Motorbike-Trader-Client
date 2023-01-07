import React, { useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';
import BookingModal from '../BookingModal/BookingModal';
import ProductCard from '../ProductCard/ProductCard';

const Products = () => {
    // Title
    useTitle('Products');
    // Get Products By Category From Database
    const products = useLoaderData();
    // Navigation
    const navigation = useNavigation();
    // Set Booking Product
    const [bookingProduct, setBookingProduct] = useState(null);

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
        <div>
            {/* Product Cards */}
            <div className='my-12 grid grid-cols-1 md:grid-cols-2 gap-6 mx-6'>
                {
                    products.map(product => <ProductCard
                        key={product?._id}
                        product={product}
                        calculateYearsOfUse={calculateYearsOfUse}
                        setBookingProduct={setBookingProduct}
                    ></ProductCard>)
                }
            </div >
            {/* Product Modal */}
            {
                bookingProduct && <BookingModal
                    bookingProduct={bookingProduct}
                    setBookingProduct={setBookingProduct}
                ></BookingModal>
            }
        </div>
    );
};

export default Products;