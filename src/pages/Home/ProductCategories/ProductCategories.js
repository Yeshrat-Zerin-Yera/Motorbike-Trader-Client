import React from 'react';
import Yamaha from '../../../assets/images/productCategories/yamaha.png';
import Honda from '../../../assets/images/productCategories/honda.png';
import Suzuki from '../../../assets/images/productCategories/suzuki.png';
import Hero from '../../../assets/images/productCategories/hero.png';
import Bajaj from '../../../assets/images/productCategories/bajaj.png';
import TVS from '../../../assets/images/productCategories/tvs.png';
import { Link } from 'react-router-dom';

const ProductCategories = () => {
    // Categories Data
    const categories = [
        { id: 1, img: Yamaha },
        { id: 2, img: Honda },
        { id: 3, img: Suzuki },
        { id: 4, img: Hero },
        { id: 5, img: Bajaj },
        { id: 6, img: TVS },
    ];

    return (
        <div className='mt-12'>
            {/* Product Categories Title */}
            <h4 className="text-2xl font-bold text-center text-accent mb-6">Product Categories</h4>
            {/* Categories */}
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-x-6 md:gap-x-12 gap-y-6 mx-6'>
                {
                    // Link
                    categories.map(category => <Link to={`/categories/${category?.id}`} key={category?.id} className='border border-l-cyan-500 border-t-cyan-400 border-r-blue-400 border-b-blue-500'>
                        {/* Image */}
                        <img src={category?.img} alt="" className='mx-auto' />
                    </Link>)
                }
            </div>
        </div>
    );
};

export default ProductCategories;