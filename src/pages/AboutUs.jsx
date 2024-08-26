import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/configApi";

const AboutUs = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}admin/allbooks`);
        setData(response.data.books);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="pt-40 px-4">
      {/* Heading at the top */}
      <h1 className="text-4xl font-bold text-center underline mb-10">About Us</h1>

      <div className="flex flex-wrap justify-between">
        {/* First Div for Images with Slider */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-10">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
          >
            <SwiperSlide>
              <img src="/images/slider1.png" alt="Image 1" className="w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/slider2.png" alt="Image 2" className="w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/slider3.png" alt="Image 3" className="w-full" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Second Div for Heading and Paragraphs */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 mb-10">
          <h2 className="text-3xl font-bold mb-4 text-red-500">Our Story :-)</h2>
          <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum repellat sint eum, culpa fugit ut voluptatem eveniet delectus dolores commodi similique harum, perferendis ipsa suscipit eligendi recusandae inventore ab in vero, debitis perspiciatis id.</p>
          <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur magnam, aut in a quaerat repellat placeat necessitatibus dolorem esse eum eaque corporis? Maiores, eius quaerat. Vitae voluptates dolorem iusto officia at similique dolores sapiente quod illo corporis quae odio aspernatur ab ea, maiores amet vel.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore tempore ad voluptatibus at corporis debitis hic inventore. Hic, quas aliquam.</p>
          <div className="mt-8 p-2">
            <Link className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" to="/books">Start Shopping</Link>
          </div>
        </div>
      </div>

      {/* Slider to show books */}
      <div className="w-full my-10">
        <h2 className="text-3xl font-bold text-center underline mb-8">Explore Our Books</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 }, // xs
            768: { slidesPerView: 2 }, // md
            1024: { slidesPerView: 4 }, // lg
          }}
          loop={true}
        >
          {data.map((book) => (
            <SwiperSlide key={book._id}>
              <div
                className="p-4 bg-gray-800 text-white rounded cursor-pointer"
                onClick={() => navigate(`/view-book-details/${book._id}`)}
              >
                <img src={book.imageUrl || "/images/placeholder.png"} alt={book.title} className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="mt-2">{book.author}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AboutUs;
