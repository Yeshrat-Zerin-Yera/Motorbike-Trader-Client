import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { FaCheckCircle, FaProductHunt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const MyOrders = () => {
    // Title
    useTitle('My Orders');
    // Auth Context
    const { user } = useContext(AuthContext);

    // Get Orders By Email From Database
    const { data: bookings = [], isLoading } = useQuery({
        queryKey: ['bookings'],
        queryFn: () => fetch(`http://localhost:5000/bookings?email=${user?.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
    });

    // Loading
    if (isLoading) {
        return <Loading></Loading>;
    }

    // If There Is No Order
    if (bookings.length === 0) {
        return <h2 className="text-2xl text-center text-accent font-bold">There Is No Order</h2>
    }

    return (
        <div>
            <h2 className="text-2xl mb-6 text-center text-accent font-bold">My Orders</h2>
            {/* My Orders Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {
                            bookings.map((booking, index) => <tr key={booking?._id} className="hover">
                                {/* Index */}
                                <th>{index + 1}</th>
                                {/* Product Image */}
                                <th>
                                    {
                                        booking?.productImg ?
                                            <img src={booking?.productImg} alt="" className='h-10 w-10 rounded-full' />
                                            : <FaProductHunt className='text-4xl text-blue-500' />
                                    }
                                </th>
                                {/* Product Name */}
                                <td>{booking?.productName}</td>
                                {/* Product Resell Price */}
                                <td>{booking?.resellPrice}$</td>
                                {/* Payment Status */}
                                <td>
                                    {
                                        booking?.paid === true
                                            ? <span className='flex items-center text-blue-500'>
                                                {/* Check Mark */}
                                                <FaCheckCircle className='text-2xl inline' />
                                                {/* Paid */}
                                                <span className='ml-2'>Paid</span>
                                            </span>
                                            // Pay Button
                                            : <Link to={`/dashboard/payment/${booking?._id}`} className="btn btn-accent text-white btn-sm">Pay</Link>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrders;