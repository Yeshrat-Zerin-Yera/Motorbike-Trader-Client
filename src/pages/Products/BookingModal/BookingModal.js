import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const BookingModal = ({ bookingProduct, setBookingProduct }) => {
    // Use Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // Use Context
    const { user } = useContext(AuthContext);

    // Handle Booking
    const handleBooking = data => {
        console.log(data);
        // Booking
        const booking = {
            productName: bookingProduct?.productName,
            resellPrice: bookingProduct?.resellPrice,
            productId: bookingProduct?._id,
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            buyerPhoneNumber: data?.phoneNumber,
            buyerLocation: data?.location
        };
        // Post Booking To Database
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(bookingData => {
                console.log(bookingData);
                if (bookingData?.acknowledged) {
                    // Change Product Status To Sold
                    fetch(`http://localhost:5000/products/status/${bookingProduct?._id}`, {
                        method: 'PUT'
                    })
                        .then(res => res.json())
                        .then(productData => console.log(productData))
                    // Success Toast
                    toast.success(`${bookingProduct?.productName} Booked Successfully`);
                    // Set Booking Product To Close Modal
                    setBookingProduct(null);
                    // Reset Form
                    reset();
                }
            })
            .catch(error => {
                console.error(error);
                toast.error(`${bookingProduct?.productName} Booking Was Unsuccessfull`)
            })
    };

    return (
        <div>
            <input type="checkbox" id="bookingModal" className="modal-toggle" />
            {/* Modal */}
            <div className="modal">
                {/* Modal Box */}
                <div className="modal-box">
                    {/* Modal Close */}
                    <label htmlFor="bookingModal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    {/* Product Name */}
                    <h2 className='text-2xl'>Product: {bookingProduct?.productName}</h2>
                    {/* Product Price */}
                    <p>Price: <b>{bookingProduct?.resellPrice}$</b></p>
                    {/* Form */}
                    <form onSubmit={handleSubmit(handleBooking)} className='mt-3'>
                        {/* Buyer Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Name" className="input input-bordered w-full" defaultValue={user?.displayName} disabled />
                        </div>
                        {/* Buyer Email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Email" className="input input-bordered w-full" defaultValue={user?.email} disabled />
                        </div>
                        {/* Buyer Phone Number */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input type="number" placeholder="Phone Number" className="input input-bordered w-full" {...register('phoneNumber', { required: "Phone number must be included" })} />
                            {/* Buyer Phone Number Error */}
                            {errors?.phoneNumber && <span className='text-xs text-error mt-1'>{errors?.phoneNumber?.message}</span>}
                        </div>
                        {/* Buyer Location */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Location</span>
                            </label>
                            <input type="text" placeholder="Location" className="input input-bordered w-full" {...register('location', { required: "Location must be included" })} />
                            {/* Buyer Location Error */}
                            {errors?.location && <span className='text-xs text-error mt-1'>{errors?.location?.message}</span>}
                        </div>
                        {/* Book Button */}
                        <input type='submit' value='Book' className="btn border-none bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-lg font-normal mt-3" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;