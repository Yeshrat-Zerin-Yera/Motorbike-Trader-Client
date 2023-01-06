import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-hot-toast';
import { FaCheckCircle, FaTrash, FaProductHunt } from 'react-icons/fa';
import Loading from '../../Shared/Loading/Loading';

const MyProducts = () => {
    // Get User's Products From Database
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: () => fetch('http://localhost:5000/products')
            .then(res => res.json())
    });

    // Loading
    if (isLoading) {
        return <Loading></Loading>;
    }

    // If There Is No Seller
    if (products.length === 0) {
        return <h2 className="text-2xl text-center text-accent font-bold">There Is No Product</h2>
    }

    // Handle Delete Product
    const handleDeleteProduct = product => {
        // Confirm Dialog To Processed Delete Operation
        const processed = window.confirm(`Are You Sure You Want To Delete Product ${product?.productName}`);
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
                        toast.success(`Product ${product?.productName} Deleted Succcessfully`);
                        // Refetch
                        refetch();
                    }
                })
                .catch(error => {
                    console.error(error);
                    // Delete Unuccessfull Toast
                    toast.error(`Product ${product?.productName} Deletetion Was Unucccessfull`);
                })
        }
    };

    // Handle Advertise Product
    const handleAdvertiseProduct = product => {
        // Confirm Dialog To Processed Advertise Operation
        const processed = window.confirm(`Are You Sure You Want To Advertise Product ${product?.productName}`);
        // Advertise Operation
        if (processed) {
            fetch(`http://localhost:5000/products/advertise/${product?._id}`, {
                method: 'PUT'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data?.modifiedCount > 0) {
                        // Modify Successfull Toast
                        toast.success(`Product ${product?.productName} Advertised`);
                        // Refetch
                        refetch();
                    }
                })
                .catch(error => {
                    console.error(error);
                    // Modify Successfull Toast
                    toast.error(`Product ${product?.productName} Advertisement Was Unsuccessfull`);
                })
        }
    };

    return (
        <div>
            <h2 className="text-2xl mb-6 text-center text-accent font-bold">My Products</h2>
            {/* My Products Table */}
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
                            <th>Advertise</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {/* Table Body */}
                    <tbody>
                        {
                            products.map((product, index) => <tr key={product?._id} className="hover">
                                {/* Index */}
                                <th>{index + 1}</th>
                                {/* Image */}
                                <th>
                                    {
                                        product?.img ?
                                            <img src={product?.img} alt="" className='h-10 w-10 rounded-full' />
                                            : <FaProductHunt className='text-4xl text-blue-500' />
                                    }
                                </th>
                                {/* Product */}
                                <td>{product?.productName}</td>
                                {/* Price */}
                                <td className='font-semibold'>{product?.sellingPrice}$</td>
                                {/* Status */}
                                <td className={product?.status === 'Available' ? 'text-blue-500' : 'text-orange-500'} >{product?.status}</td>
                                {/* Advertise Product */}
                                <td>
                                    {
                                        product?.advertised === true
                                            ? <span className='flex items-center text-blue-500'>
                                                {/* Check Mark */}
                                                <FaCheckCircle className='text-2xl inline' />
                                                {/* Advertised */}
                                                <span className='ml-2'>Advertised</span>
                                            </span>
                                            // Advertise Button
                                            : <button onClick={() => handleAdvertiseProduct(product)} className="btn btn-accent text-white btn-sm" disabled={product?.status === 'Sold'}>Advertise</button>
                                    }
                                </td>
                                {/* Delete Product */}
                                <td>
                                    <button onClick={() => handleDeleteProduct(product)} className='bg-error rounded-lg p-[6px] text-white flex items-center font-[500] hover:bg-red-500'>
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

export default MyProducts;