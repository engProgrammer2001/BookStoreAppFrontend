import React from "react";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { API_BASE_URL } from "../../config/configApi";

const FavouritesCart = ({ data, favourites }) => {
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}favourite/delete/${data._id}`,
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.log("Error: ", error);
      alert(response.data.message);
    }
  };

  return (
    <div className="bg-zinc-700 mt-3 rounded-lg p-3">
      <div className="flex flex-col md:flex-row h-auto md:h-[25vh]">
        {/* Image Div */}
        <div className="w-full md:w-[30%]">
          <Link to={`/view-book-details/${data._id}`}>
            <img
              src={data.imageUrl}
              alt="Book Cover"
              className="w-full h-full object-cover p-3 rounded-lg"
            />
          </Link>
        </div>

        {/* Second Div for Book Information */}
        <div className="w-full md:w-[70%] p-4 flex flex-col justify-center">
          <div className="flex flex-col md:flex-row md:items-center mb-2">
            <h2 className="text-2xl font-bold">{data.title}</h2>
            <p className="text-lg md:ml-4">
              <span className="font-semibold">Ct: </span>
              {data.category}
            </p>
          </div>
          <div className="mt-2">
            <p className="text-lg">
              <span className="font-semibold">Discount Price: </span>
              {data.discountPrice}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Price: </span>
              {data.price}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Author: </span>
              {data.author}
            </p>
          </div>
          {/* this is remove button code */}
          {favourites && (
            <div className="mt-4 md:mt-0 md:ml-auto">
              <Link
                onClick={handleRemoveBook}
                className="border border-red-500 p-3 text-red-500 rounded-md flex items-center"
              >
                Remove From Favourite <MdDeleteForever className="ml-2" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavouritesCart;
