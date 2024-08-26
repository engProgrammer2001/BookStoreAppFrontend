import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

const Hero = () => {
  const navigate = useNavigate();
  const images = [
    '/images/slider1.png',
    '/images/slider2.png',
    '/images/slider3.png',
  ];

  return (
    <div className='flex flex-col lg:flex-row justify-center items-center pt-16 lg:w-full lg:py-32'>
      <div className="w-full lg:w-full lg:h-[70vh]">
        <Swiper
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          className='h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] w-full'
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img 
                src={image} 
                alt={`slider ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Hero;
