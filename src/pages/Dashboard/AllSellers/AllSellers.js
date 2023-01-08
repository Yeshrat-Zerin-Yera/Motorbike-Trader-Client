import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { FaUser, FaCheckCircle, FaTrash } from 'react-icons/fa';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const AllSellers = () => {
    // Title
    useTitle('All Sellers');

    // Get All Sellers From Database
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: () => fetch('https://motorbike-trader-server.vercel.app/users/sellers')
            .then(res => res.json())
    });

    // Loading
    if (isLoading) {
        return <Loading></Loading>;
    }

    // If There Is No Seller
    if (sellers.length === 0) {
        return <h2 className="text-2xl text-center text-accent font-bold">There Is No Seller</h2>
    }

    // Handle Delete Seller
    const handleDeleteSeller = seller => {
        // Confirm Dialog To Processed Delete Operation
        const processed = window.confirm(`Are You Sure You Want To Delete Seller ${seller?.name}`);
        // Delete Operation
        if (processed) {
            fetch(`https://motorbike-trader-server.vercel.app/users/${seller?._id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data?.deletedCount > 0) {
                        // Delete Successfull Toast
                        toast.success(`Seller ${seller?.name} Deleted Succcessfully`);
                        // Refetch
                        refetch();
                    }
                })
                .catch(error => {
                    console.error(error);
                    // Delete Unuccessfull Toast
                    toast.error(`Seller ${seller?.name} Deletetion Was Unucccessfull`);
                })
        }
    };

    // Handle Verify Seller
    const handleVerifySeller = seller => {
        // Confirm Dialog To Processed Verify Operation
        const processed = window.confirm(`Are You Sure You Want To Verify Seller ${seller?.name}`);
        // Verify Operation
        if (processed) {
            fetch(`https://motorbike-trader-server.vercel.app/users/${seller?._id}`, {
                method: 'PUT'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data?.modifiedCount > 0) {
                        // Modify Successfull Toast
                        toast.success(`Seller ${seller?.name} Verified`);
                        // Refetch
                        refetch();
                    }
                })
                .catch(error => {
                    console.error(error);
                    // Modify Unsuccessfull Toast
                    toast.error(`Seller ${seller?.name} Verification Was Unsuccessfull`);
                })
        }
    };

    return (
        <div>
            <h2 className="text-2xl mb-6 text-center text-accent font-bold">All Sellers</h2>
            {/* All Sellers Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {
                            sellers.map((seller, index) => <tr key={seller?._id} className="hover">
                                {/* Index */}
                                <th>{index + 1}</th>
                                {/* Image */}
                                <th>
                                    {
                                        seller?.photoURL ?
                                            <img src={seller?.photoURL} alt="" className='h-10 w-10 rounded-full' />
                                            : <FaUser className='text-4xl text-blue-500' />
                                    }
                                </th>
                                {/* Name */}
                                <td>{seller?.name}</td>
                                {/* Email */}
                                <td>{seller?.email}</td>
                                {/* Verify Seller */}
                                <td>
                                    {
                                        seller?.status === 'Verified'
                                            ? <span className='flex items-center text-blue-500'>
                                                {/* Check Mark */}
                                                <FaCheckCircle className='text-2xl inline' />
                                                {/* Varified */}
                                                <span className='ml-2'>Verified</span>
                                            </span>
                                            // Verify Button
                                            : <button onClick={() => handleVerifySeller(seller)} className="btn btn-accent text-white btn-sm">Verify</button>
                                    }
                                </td>
                                {/* Delete Seller */}
                                <td>
                                    <button onClick={() => handleDeleteSeller(seller)} className='bg-error rounded-lg p-[6px] text-white flex items-center font-[500] hover:bg-red-500'>
                                        Delete <FaTrash className='ml-1' /></button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;