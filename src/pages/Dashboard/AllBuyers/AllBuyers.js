import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { FaUser, FaTrash } from 'react-icons/fa';
import Loading from '../../Shared/Loading/Loading';

const AllBuyers = () => {
    // Get All Sellers From Database
    const { data: buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: () => fetch('http://localhost:5000/users/buyers')
            .then(res => res.json())
    });

    // Loading
    if (isLoading) {
        return <Loading></Loading>;
    }

    // If There Is No Buyer
    if (buyers.length === 0) {
        return <h2 className="text-2xl text-center text-accent font-bold">There Is No Buyer</h2>
    }

    // Handle Delete Buyer
    const handleDeleteBuyer = buyer => {
        // Confirm Dialog To Processed Delete Operation
        const processed = window.confirm(`Are You Sure You Want To Delete Buyer ${buyer?.name}`);
        // Delete Operation
        if (processed) {
            fetch(`http://localhost:5000/users/${buyer?._id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data?.deletedCount > 0) {
                        // Delete Successfull Toast
                        toast.success(`Buyer ${buyer?.name} Deleted Succcessfully`);
                        // Refetch
                        refetch();
                    }
                })
                .catch(error => {
                    console.error(error);
                    // Delete Unuccessfull Toast
                    toast.error(`Buyer ${buyer?.name} Deletetion Was Unucccessfull`);
                })
        }
    };

    return (
        <div>
            <h2 className="text-2xl mb-6 text-center text-accent font-bold">All Buyers</h2>
            {/* All Buyers Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {
                            buyers.map((buyer, index) => <tr key={buyer?._id} className="hover">
                                {/* Index */}
                                <th>{index + 1}</th>
                                {/* Image */}
                                <th>
                                    {
                                        buyer?.photoURL ?
                                            <img src={buyer?.photoURL} alt="" className='h-10 w-10 rounded-full' />
                                            : <FaUser className='text-4xl text-blue-500' />
                                    }
                                </th>
                                {/* Name */}
                                <td>{buyer?.name}</td>
                                {/* Email */}
                                <td>{buyer?.email}</td>
                                {/* Delete Buyer */}
                                <td>
                                    <button onClick={() => handleDeleteBuyer(buyer)} className='bg-error rounded-lg p-[6px] text-white flex items-center font-[500] hover:bg-red-500'>
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

export default AllBuyers;