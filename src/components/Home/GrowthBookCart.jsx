import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config/configApi";

const GrowthBookCart = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}admin/allbooks`);
        console.log("API response: ", response.data.books);
        setData(response.data.books);
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
    <div className="">
      <h1 className="text-3xl p-4 mb-4 text-white underline">
        Most Trending Books
      </h1>

      <div className="flex flex-col lg:flex-row p-4 gap-6">
        {/* Left Div */}
        <div className="w-full lg:w-1/2 bg-gray-500 p-4 rounded">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.slice(0, 4).map((book) => (
              <div
                key={book._id}
                className="cursor-pointer p-2 bg-gray-800 rounded"
                onClick={() => handleBookClick(book._id)}
              >
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-40 object-cover"
                />
                <h4 className="text-xl mt-2 text-white">{book.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Right Div */}
        <div className="w-full lg:w-1/2 bg-gray-500 p-4 rounded">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.slice(4, 8).map((book) => (
              <div
                key={book._id}
                className="cursor-pointer p-2 bg-gray-800 rounded"
                onClick={() => handleBookClick(book._id)}
              >
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-40 object-cover"
                />
                <h4 className="text-xl mt-2 text-white">{book.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthBookCart;
