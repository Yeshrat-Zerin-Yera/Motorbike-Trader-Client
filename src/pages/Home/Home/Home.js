import React from 'react';
import BannerCarousel from '../BannerCarousel/BannerCarousel';
import ContactUs from '../ContactUs/ContactUs';
import ProductCategories from '../ProductCategories/ProductCategories';

const Home = () => {
    return (
        <div className='my-12'>
            <BannerCarousel></BannerCarousel>
            <ProductCategories></ProductCategories>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;