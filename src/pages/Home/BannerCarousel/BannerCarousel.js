import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import './BannerCarousel.css';

const BannerCarousel = () => {
    // Carousel Data
    const slides = [
        { id: 1, img: 'https://i.ibb.co/yYTnWsW/banner-1.jpg', title: 'Buy Your Next Motorbike 100% Online.', content: 'Get the motorbike and pricing details you need, without any pressure, by conveniently buying from the comfort of your home' },
        { id: 2, img: 'https://i.ibb.co/M7V1WVM/banner-2.jpg', title: 'Sell Your Motorbike Easily', content: 'A lot of buyers are looking for their next Motorbike on Motorbyke Trader' }
    ];

    return (
        <Carousel>
            {
                slides.map(slide => <div key={slide?.id} className='slide relative'>
                    {/* Carousel Image */}
                    <img src={slide?.img} alt='' />
                    {/* Carousel Details */}
                    <div className='absolute top-0 lg:top-1/4 text-left m-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-blue-100'>
                        {/* Title */}
                        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-6'>{slide?.title}</h1>
                        {/* Content */}
                        <p className='hidden sm:block md:text-xl mb-6'>{slide?.content}</p>
                        {/* Button */}
                        <Link to='/' class="btn border-0 bg-gradient-to-r from-cyan-400 to-blue-500">Products</Link>
                    </div>
                </div>)
            }
        </Carousel>
    );
};

export default BannerCarousel;