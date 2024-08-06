import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/configApi';
import Loader from '../Loader/Loader';
import BookCart from '../BookCart/BookCart';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

const FindBookByCategory = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}admin/allbooks`);
        const filteredBooks = response.data.books.filter(book => book.category === 'Story');
        setData(filteredBooks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pb-4">
      <div className='m-auto mt-8 border rounded-lg border-green-500 p-8 bg-gray-600'>
        <div className="mt-8">
          <h1 className="text-3xl text-[#fc575cdd]">All Children's Story Books</h1>
          {!data && (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          )}
          {data && (
            <Swiper
              spaceBetween={40}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              className="my-4 text-white"
              breakpoints={{
                0: { // For xs screens
                  slidesPerView: 1,
                },
                768: { // For md screens
                  slidesPerView: 1,
                },
                1024: { // For lg screens
                  slidesPerView: 3,
                },
              }}
            >
              {data.map((item, i) => (
                <SwiperSlide key={i}>
                  <BookCart data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}

export default FindBookByCategory;
