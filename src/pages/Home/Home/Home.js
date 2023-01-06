import React from 'react';
import useTitle from '../../../hooks/useTitle';
import BannerCarousel from '../BannerCarousel/BannerCarousel';
import ContactUs from '../ContactUs/ContactUs';
import ProductCategories from '../ProductCategories/ProductCategories';

const Home = () => {
    // Title
    useTitle('Home');

    return (
        <div className='my-12'>
            <BannerCarousel></BannerCarousel>
            <ProductCategories></ProductCategories>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;