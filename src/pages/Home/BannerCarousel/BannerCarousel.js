import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './BannerCarousel.css';

// https://i.ibb.co/DfDn1GF/banner-4.jpg
const BannerCarousel = () => {
    return (
        <div>
            <Carousel>
                <div>
                    <img src="https://i.ibb.co/0fkbzmD/banner-1.jpg" alt='' />
                </div>
                <div>
                    <img src="https://i.ibb.co/dtwDZDp/banner-2.jpg" alt='' />
                </div>
                <div>
                    <img src="https://i.ibb.co/jrJCM1p/banner-3.jpg" alt='' />
                </div>
            </Carousel>
        </div>
    );
};

export default BannerCarousel;