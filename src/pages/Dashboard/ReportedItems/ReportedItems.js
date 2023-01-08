import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { FaProductHunt, FaTrash } from 'react-icons/fa';
import useTitle from '../../../hooks/useTitle';
import Loading from '../../Shared/Loading/Loading';

const ReportedItems = () => {
    // Title
    useTitle('Reported Items');

    // Get Reported Products From Database
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch('http://localhost:5000/reportedproducts')
            .then(res => res.json())
    });

    // Loading
    if (isLoading) {
        return <Loading></Loading>;
    }

    // If There Is No Reported Products
    if (products.length === 0) {
        return <h2 className="text-2xl text-center text-accent font-bold">There Is No Reported Items</h2>
    }

    // Handle Delete Reported Products
    const handleDeleteReportedProducts = product => {
        // Confirm Dialog To Processed Delete Operation
        const processed = window.confirm(`Are You Sure You Want To Delete Reported Product ${product?.productName}`);
        // Delete Operation
        if (processed) {
            fetch(`http://localhost:5000/products/${product?._id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data?.deletedCount > 0) {
                        // Delete Successfull Toast
                        toast.success(`Reported Product ${product?.name} Deleted Successfully`);
                        // Refetch
                        refetch();
                    }
                })
                .catch(error => {
                    console.error(error);
                    // Delete Unuccessfull Toast
                    toast.error(`Reported Product ${product?.name} Deletetion Was Unsuccessfull`);
                })
        }
    };

    return (
        <div>
            <h2 className="text-2xl mb-6 text-center text-accent font-bold">Reported Items</h2>
            {/* Reported Products Table */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>Seller Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {
                            products.map((product, index) => <tr key={product?._id} className="hover">
                                {/* Index */}
                                <th>{index + 1}</th>
                                {/* Product Image */}
                                <th>
                                    {
                                        product?.img ?
                                            <img src={product?.img} alt="" className='h-10 w-10 rounded-full' />
                                            : <FaProductHunt className='text-4xl text-blue-500' />
                                    }
                                </th>
                                {/* Product Name */}
                                <td>{product?.productName}</td>
                                {/* Seller Name */}
                                <td>{product?.seller}</td>
                                {/* Seller Email */}
                                <td>{product?.email}</td>
                                {/* Delete Reported Products */}
                                <td>
                                    <button onClick={() => handleDeleteReportedProducts(product)} className='bg-error rounded-lg p-[6px] text-white flex items-center font-[500] hover:bg-red-500'>
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

export default ReportedItems;