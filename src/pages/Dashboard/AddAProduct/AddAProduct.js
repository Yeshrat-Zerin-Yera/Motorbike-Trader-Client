import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import useTitle from '../../../hooks/useTitle';

const AddAProduct = () => {
    // Use Title
    useTitle('Add Product');
    // Use Form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // Navigate
    const navigate = useNavigate();
    // Auth Context
    const { user } = useContext(AuthContext);

    // Handle Add Product
    const handleAddProduct = data => {
        // Post Image To Imgbb
        const img = data.img[0];
        const formData = new FormData();
        formData.append('image', img);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imagebb_key}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // Post Product To Database
                    // Get Current Date
                    const current = new Date();
                    const date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
                    const product = {
                        productName: data?.productName,
                        img: imgData?.data?.url,
                        orginalPrice: data?.orginalPrice,
                        resellPrice: data?.resellPrice,
                        category: data?.category,
                        condition: data?.condition,
                        status: 'Available',
                        advertised: false,
                        purchaseDate: data.purchaseDate,
                        resellDate: date,
                        seller: user?.displayName,
                        email: user?.email,
                        phoneNumber: data?.phoneNumber,
                        location: data?.location,
                        description: data?.description
                    }
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(productData => {
                            console.log(productData);
                            if (productData?.acknowledged) {
                                toast.success(`Product ${data?.productName} Added Successfully`);
                                reset();
                                navigate('/dashboard/myproducts');
                            }
                        })
                }
            })
    };

    return (
        <div>
            <h2 className="text-2xl mb-6 text-center text-accent font-bold">Add A Product</h2>
            {/* Form */}
            <form onSubmit={handleSubmit(handleAddProduct)} className='p-6 max-w-full bg-white grid grid-cols-1 md:grid-cols-2 gap-x-4'>
                {/* Product Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input type="text" placeholder="Product Name" className="input input-bordered" {...register('productName', { required: "Product name must be included" })} />
                    {/* Product Name Error */}
                    {errors?.productName && <span className='text-xs text-error mt-1'>{errors?.productName?.message}</span>}
                </div>
                {/* Product Image */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product Image</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full" {...register('img', { required: "Product image must be included" })} />
                    {/* Product Image Error */}
                    {errors?.img && <span className='text-xs text-error mt-1'>{errors?.img?.message}</span>}
                </div>
                {/* Product Orginal Price */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Orginal Price</span>
                    </label>
                    <input type="number" placeholder="Orginal Price" className="input input-bordered w-full" {...register('orginalPrice', { required: "Orginal price must be included" })} />
                    {/* Product Orginal Price Error */}
                    {errors?.orginalPrice && <span className='text-xs text-error mt-1'>{errors?.orginalPrice?.message}</span>}
                </div>
                {/* Product Resell Price */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Resell Price</span>
                    </label>
                    <input type="number" placeholder="Resell Price" className="input input-bordered w-full" {...register('resellPrice', { required: "Resell price must be included" })} />
                    {/* Product Resell Price Error */}
                    {errors?.resellPrice && <span className='text-xs text-error mt-1'>{errors?.resellPrice?.message}</span>}
                </div>
                {/* Product Category */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select className="select select-bordered w-full" {...register('category')}>
                        <option selected>Honda</option>
                        <option>Suzuki</option>
                        <option>Yamaha</option>
                        <option>TVS</option>
                        <option>Bajaj</option>
                        <option>Hero</option>
                    </select>
                </div>
                {/* Product Condition */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Condition</span>
                    </label>
                    <select className="select select-bordered w-full" {...register('condition')}>
                        <option selected>Excellent</option>
                        <option>Good</option>
                        <option>Fair</option>
                    </select>
                </div>
                {/* Product Purchase Date */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Purchase Date</span>
                    </label>
                    <input type="date" placeholder="Purchase Date" className="input input-bordered w-full" {...register('purchaseDate', { required: "Purchase date must be included" })} />
                    {/* Product Purchase Date Error */}
                    {errors?.purchaseDate && <span className='text-xs text-error mt-1'>{errors?.purchaseDate?.message}</span>}
                </div>
                {/* Seller Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Seller Name</span>
                    </label>
                    <input type="text" placeholder="Seller Name" className="input input-bordered w-full" defaultValue={user?.displayName} disabled {...register('sellerName')} />
                </div>
                {/* Seller Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email" className="input input-bordered w-full" defaultValue={user?.email} disabled {...register('sellerEmail')} />
                </div>
                {/* Seller Phone Number */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input type="number" placeholder="Phone Number" className="input input-bordered w-full" {...register('phoneNumber', { required: "Phone number must be included" })} />
                    {/* Seller Phone Number Error */}
                    {errors?.phoneNumber && <span className='text-xs text-error mt-1'>{errors?.phoneNumber?.message}</span>}
                </div>
                {/* Seller Location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text" placeholder="Location" className="input input-bordered w-full" {...register('location', { required: "Location must be included" })} />
                    {/* Seller Location Error */}
                    {errors?.location && <span className='text-xs text-error mt-1'>{errors?.location?.message}</span>}
                </div>
                <div>
                    {/* Product Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Product Description</span>
                        </label>
                        <textarea className="textarea input-bordered w-full text-[16px]" placeholder="Description" {...register('description', { required: "Description must be included" })}></textarea>
                        {/* Product Description Error */}
                        {errors?.description && <span className='text-xs text-error mt-1'>{errors?.description?.message}</span>}
                    </div>
                    {/* Submit Button */}
                    <div className="form-control mt-6">
                        <button className="btn btn-accent text-white text-lg font-normal">Add</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddAProduct;