import React from 'react';
import BannerCarousel from '../BannerCarousel/BannerCarousel';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
    return (
        <div className='my-12'>
            <BannerCarousel></BannerCarousel>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;