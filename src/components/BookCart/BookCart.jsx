import React from "react";
import { useNavigate } from "react-router-dom";



const BookCart = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="cursor-pointer" onClick={() => navigate(`/view-book-details/${data._id}`)}>
      <div className="dark:bg-gray-700 rounded p-4 ">
        <div>
          <img
            className="h-[30vh] w-[100%]"
            src={data.imageUrl}
            alt="BookImages"
          />
        </div>
        <div className="pt-4 flex justify-between">
          <p className="text-[#fc575cdd]">Author : {data.author}</p>
          <p className="text-green-600 text-semibold">{data.category}</p>
        </div>
        <div className="py-4">
          <h1 className=" font-bold">{data.title}</h1>
        </div>
        <div className="flex justify-between ">
          <p className="text-[#fc575cdd]">₹{data.discountPrice}</p>
          <p className="text-[#fc575cdd] line-through">₹{data.price}</p>
          <p className="text-green-600 text-semibold">
            {data.discountPercentage}% off
          </p>
        </div>
        <div className="flex justify-between py-2">
          <p className="text-green-600 text-semibold">{data.publishedDate}</p>
          <p className="text-green-600 text-semibold">{data.language}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCart;
