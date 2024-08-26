import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import axios from "axios";
import { API_BASE_URL } from "../../config/configApi";

const Banner = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}admin/allbooks`);
        // console.log("API response: ", response.data);
        const discountedBooks = response.data.books.filter(
          (book) => book.discountPercentage > 50
        );
        setImages(discountedBooks);
        // console.log("Discounted books: ", discountedBooks);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-[40vh] flex justify-center items-center my-8">
      <Swiper
        spaceBetween={40}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="h-full"
      >
        {images.map((book, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <a href={`/view-book-details/${book._id}`} className="w-full flex justify-center">
              <img
                src={book.imageUrl} // Assuming `book.imageUrl` contains the URL of the image
                alt={book.title} // Assuming `book.title` contains the title of the book
                className="w-[70%] h-full object-cover"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
