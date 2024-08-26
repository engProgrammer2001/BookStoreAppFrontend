import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

import { API_BASE_URL } from "../../config/configApi";

const LowBookCart = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}admin/allbooks`);
        const lowBooks = response.data.books.filter(
          (book) => book.category.toLowerCase() === "low"
        );
        setData(lowBooks);
        console.log("Filtered low price books: ", lowBooks);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleBookClick = (bookId) => {
    navigate(`/view-book-details/${bookId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4 text-white underline">All Low Trending Books</h1>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1} 
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: {
            slidesPerView: 2, 
          },
          768: {
            slidesPerView: 2, 
          },
          1024: {
            slidesPerView: 4, 
          },
        }}
      >
        {data.map((book, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-gray-700 p-4 cursor-pointer rounded-md"
              onClick={() => handleBookClick(book._id)}
            >
              <div className="w-full h-48 lg:h-64 overflow-hidden">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-semibold mt-2 text-center text-white">{book.title}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LowBookCart;
