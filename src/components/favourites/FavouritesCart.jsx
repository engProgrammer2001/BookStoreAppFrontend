import React from "react";

const FavouritesCart = ({data}) => {
    console.log("items are : ", data);
  return (
    <>
    <div className="bg-zinc-400 mt-3 rounded-lg">
    <div className="flex h-[25vh]">
      <div className="w-[30%]">
        <img
          src="your-image-url-here.jpg"
          alt="Book Cover"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Second Div for Book Information */}
      <div className="w-[70%] p-4 flex flex-col justify-center">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold w-[50%]">Book Title</h2>
          <p className="text-lg w-[20%] ml-4">
            <span className="font-semibold">Category: </span>Category Name
          </p>
        </div>
        <div className="mt-2">
          <p className="text-lg">
            <span className="font-semibold">Price: </span>$20.00
          </p>
          <p className="text-lg">
            <span className="font-semibold">Discount Price: </span>$15.00
          </p>
          <p className="text-lg">
            <span className="font-semibold">Author: </span>Author Name
          </p>
        </div>
      </div>
    </div>
      </div>
    </>
  );
};

export default FavouritesCart;
