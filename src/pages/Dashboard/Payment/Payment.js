import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
    // Use Title
    useTitle('Payment');
    // Get Booking By Id From Database
    const booking = useLoaderData();
    const { productName, resellPrice } = booking;
    // Navigation
    const navigation = useNavigation();

    // Loading
    if (navigation.state === 'loading') {
        return <Loading></Loading>;
    }

    return (
        <div>
            {/* Product Name */}
            <h2 className="text-2xl mb-6">Payment For <b>{productName}</b></h2>
            {/* Product Price */}
            <p>Price: <b>{resellPrice}$</b></p>
            {/* Check Out Form */}
            <div className='my-12 max-w-md p-6 border-2 border-white rounded-lg'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm booking={booking} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;