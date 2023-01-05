import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { FaTrash, FaUser } from 'react-icons/fa';
import Loading from '../../Shared/Loading/Loading';

const AllSellers = () => {
    // Get All Sellers From Database
    const { data: sellers = [], isLoading, refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: () => fetch('http://localhost:5000/users/sellers')
            .then(res => res.json())
    });

    // Loading
    if (isLoading) {
        return <Loading></Loading>;
    }

    // Handle Delete Seller
    const handleDeleteSeller = seller => {
        // Confirm Dialog To Processed Delete Operation
        const processed = window.confirm(`Are You Sure You Want To Delete Seller ${seller?.name}`);
        // Delete Operation
        if (processed) {
            fetch(`http://localhost:5000/users/${seller?._id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data?.deletedCount > 0) {
                        // Toast Of Deleted Successfully
                        toast.success(`Seller ${seller?.name} Deleted SucccessFully`);
                        // Refetch
                        refetch();
                    }
                })
                .catch(error => {
                    console.error(error);
                    // Toast Of Deletion Unuccessfull
                    toast.error(`Seller ${seller?.name} Deletetion Was UnucccessFull`);
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
                                        seller?.status === 'verified '
                                            ? <span className='text-blue-500'>Verified</span>
                                            : <button className="btn btn-accent text-white btn-sm">Verify</button>
                                    }
                                </td>
                                <td><button onClick={() => handleDeleteSeller(seller)} className='btn btn-error btn-sm text-white'>Delete <FaTrash className='ml-1' /></button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSellers;