import React from "react";

const BookCart = ({ data }) => {
  console.log("Book Cart Data is : ", data);
  return (
    <div>
      <div className="dark:bg-gray-700 rounded p-4 ">
        <div>
          <img
            className="h-[45vh] w-[100%]"
            src={data.imageUrl}
            alt="BookImages"
          />
        </div>
        <div className="pt-4 flex justify-between">
          <p className="text-[#fc575cdd]">Author : {data.author}</p>
          <p className="text-green-600 text-semibold">{data.language}</p>

        </div>
          <h1 className=" font-bold">{data.title}</h1>
        <div className="flex justify-between pt-3">
          <p className="text-[#fc575cdd]">
            Discounted Price : {data.discountPrice}
          </p>
          <p className="text-[#fc575cdd] line-through">Price : {data.price}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-green-600 text-semibold">
            {data.discountPercentage}% off
          </p>
          <p className="text-green-600 text-semibold">{data.publishedDate}</p>
          <p className="text-green-600 text-semibold">{data.category
          }</p>
        </div>
      </div>
    </div>
  );
};

export default BookCart;
