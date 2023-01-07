import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const CheckoutForm = ({ booking }) => {
    // Stripe
    const stripe = useStripe();
    // Use Element
    const elements = useElements();
    // Set Card Error
    const [cardError, setCardError] = useState('');
    // Set Card Success
    const [success, setSuccess] = useState('');
    // Set Transaction Id
    const [transactionId, setTransactionId] = useState('');
    // Set Client Secret
    const [clientSecret, setClientSecret] = useState("");
    // Set Processing
    const [processing, setProcessing] = useState(false);
    // Booking From Payment
    const { resellPrice, buyerName, buyerEmail, _id, productId } = booking;

    useEffect(() => {
        // Create PaymentIntent As Soon As The Page Loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ resellPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [resellPrice]);

    // Handle Submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        // Set Card Error
        if (error) {
            setCardError(error.message)
        }
        else {
            setCardError('');
        }
        // Set Success
        setSuccess('');
        // Set Processing
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyerName,
                        email: buyerEmail
                    },
                },
            },
        );
        // Set Card Error
        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            // Post Payment To Database
            const payment = {
                resellPrice,
                transactionId: paymentIntent.id,
                buyerEmail,
                bookingId: _id,
                productId
            };
            fetch("http://localhost:5000/payments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payment),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data.insertedId) {
                        // Set Success
                        setSuccess('Your Payment Completed Successfully');
                        // Set Transaction Id
                        setTransactionId(paymentIntent.id);
                        // Success Toast
                        toast.success('Your Payment Completed Successfully');
                    }
                });
        }
        // Set Processing
        setProcessing(false);
    };

    return (
        <div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
                <CardElement
                    className='bg-white p-6 rounded-lg'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {/* Card Error */}
                <p className='text-sm text-error mt-1'>{cardError}</p>
                {/* Card Success */}
                {
                    success && <>
                        <p className='text-sm text-green-500 mt-1'>{success}</p>
                        <p className='text-sm mt-1'>Your Transaction Id: <b>{transactionId}</b></p>
                    </>
                }
                {/* Pay Button */}
                <button className='btn btn-primary text-white mt-6' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;