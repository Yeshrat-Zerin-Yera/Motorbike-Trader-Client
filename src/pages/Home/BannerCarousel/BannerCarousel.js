import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Banner1Img from '../../../assets/images/home-banner-carousel/banner-1.png';
import Banner2Img from '../../../assets/images/home-banner-carousel/banner-2.png';
import './BannerCarousel.css';

const BannerCarousel = () => {
    return (
        <Carousel>
            <img src={Banner1Img} alt='' />
            <img src={Banner2Img} alt='' />
        </Carousel>
    );
};

export default BannerCarousel;