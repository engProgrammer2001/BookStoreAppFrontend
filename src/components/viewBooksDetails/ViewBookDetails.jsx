import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import axios from "axios";
import { MdLanguage } from "react-icons/md";
import { API_BASE_URL } from "../../config/configApi";
import { FaHeart, FaEdit } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import SimilarBook from "../SimilarBook/SimilarBook";

const ViewBookDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const bookId = params.id;
  const [Data, setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleAddToCart = async () => {
    try {
      await axios.put(`${API_BASE_URL}cart/add/${bookId}`, {}, { headers });
      alert("Book Added to Cart");
    } catch (error) {
      console.error("Error: ", error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handleAddToFavourites = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}favourite/add/${bookId}`,
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error: ", error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handleDeleteBook = async () => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}admin/delete/books/${bookId}`,
        { headers }
      );
      alert(response.data.message);
      navigate("/books");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}admin/book/${bookId}`);
        setData(response.data.book);
      } catch (error) {
        console.error("Error fetching book details: ", error);
      }
    };
    fetchData();
  }, [bookId]);

  return (
    <div className="view-book-details-container mt-32">
      {!Data && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8 lg:p-20">
        <div className="p-4 md:p-8 bg-slate-800 h-[50vh] md:h-[100vh] lg:w-3/6 flex items-center justify-center rounded-lg">
          <img
            className="w-full max-w-xs md:max-w-md h-full lg:w-full lg:max-w-full"
            src={Data?.imageUrl}
            alt={Data?.title}
          />
        </div>
        <div className="text-white p-4 md:p-8 bg-slate-800 md:w-full lg:w-[50%] h-auto md:h-full rounded-lg">
          <h1 className="text-xl md:text-2xl">{Data?.title}</h1>
          <div className="flex flex-col md:flex-row justify-between text-lg md:text-xl text-[#fc575cdd] py-5 font-bold">
            <p>
              <span>By Author or Editor -</span> {Data?.author}
            </p>
            <div className="flex gap-2 justify-center items-center">
              <p className="text-white">
                <MdLanguage />
              </p>
              <p>{Data?.language}</p>
            </div>
          </div>
          <div className="flex justify-between text-lg md:text-xl text-[#fc575cdd] text-semibold gap-4">
            <p className="text-green-600 font-bold">₹ {Data?.discountPrice}</p>
            <p className="line-through font-bold">₹ {Data?.price}</p>
            <p className="text-green-600 font-bold">
              {Data?.discountPercentage}% off
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between py-5 font-bold">
            <p>Category - {Data?.category}</p>
            <p>{Data?.publishedDate}</p>
          </div>

          {isLoggedIn && role === "user" && (
            <div className="flex flex-col md:flex-row justify-between gap-4 py-5">
              <Link
                onClick={handleAddToCart}
                className="flex items-center justify-center border border-green-500 py-2 px-4 md:px-8 rounded-full bg-yellow-400 text-black text-center"
              >
                <span className="mr-2">Add to Cart</span>
                <FaCartPlus />
              </Link>
              <Link
                onClick={handleAddToFavourites}
                className="flex items-center justify-center border border-green-500 py-2 px-4 md:px-8 rounded-full bg-red-400 text-black text-center"
              >
                <span className="mr-2">Add to Favourites</span>
                <FaHeart />
              </Link>
            </div>
          )}
          {isLoggedIn && role === "admin" && (
            <div className="flex flex-col md:flex-row justify-between gap-4 py-5">
              <Link
                to={`/update-book/${bookId}`}
                className="flex items-center justify-center border border-green-500 py-2 px-4 md:px-8 rounded-full bg-yellow-400 text-black text-center"
              >
                <span className="mr-2">Edit Book</span>
                <FaEdit />
              </Link>
              <Link
                onClick={handleDeleteBook}
                className="flex items-center justify-center border border-green-500 py-2 px-4 md:px-8 rounded-full bg-red-400 text-black text-center"
              >
                <span className="mr-2">Delete Book</span>
                <MdDelete />
              </Link>
            </div>
          )}
          <div className="py-5 leading-6 text-lg md:text-xl">
            <p>{Data?.description}</p>
          </div>
        </div>

      </div>

      {/* show similar books  */}
      <div className="p-4">
          <SimilarBook bookId={bookId} category={Data?.category} />
      </div>
    </div>
  );
};

export default ViewBookDetails;
