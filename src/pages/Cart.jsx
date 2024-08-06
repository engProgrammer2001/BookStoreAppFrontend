import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { API_BASE_URL } from "../config/configApi";
import { MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [mainTotal, setmainTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}cart/getallbooks`, {
          headers,
        });
        const items = response.data.userData.cart || [];
        setCartItems(items);
        const total = items.reduce((sum, item) => sum + item.discountPrice, 0);
        const Maintotal = items.reduce((sum, item) => sum + item.price, 0);
        setTotalPrice(total);
        setmainTotal(Maintotal);
      } catch (error) {
        console.error("Error fetching cart data: ", error);
      }
    };
    fetchData();
  }, [cartItems]);

  const handleDeleteCartBooks = async (bookId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}cart/delete/${bookId}`,
        {},
        {
          headers,
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert(response?.data?.message || "An error occurred");
    }
  };

  // place Order
  const placeOrder = async () => {
    try {
      console.log("Cart items to be ordered: ", cartItems);
      const response = await axios.post(
        `${API_BASE_URL}order/place`,
        { order: cartItems },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderhistory");
    } catch (error) {
      console.log("Axios error: ", error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="pt-32 flex flex-col lg:flex-row justify-center">
      <div className="w-full lg:w-[70%] p-4 rounded-lg flex flex-col mb-4 lg:mb-0">
        <div className="flex justify-center items-center">
          {!cartItems && (
            <div className="w-full h-[100%] flex items-center justify-center">
              <Loader />
            </div>
          )}
        </div>
        {cartItems.length === 0 && (
          <div className="flex justify-center">
            <img src="images/cart.png" alt="empty cart" />
          </div>
        )}
        {cartItems.length > 0 && (
          <>
            <h1 className="text-3xl mb-4 text-white">Your Cart Items</h1>
            {cartItems.map((items, i) => (
              <div
                key={i}
                className="flex flex-col bg-zinc-700 p-4 mb-4 rounded-lg "
              >
                <div className="flex flex-col md:flex-row items-center">
                  <img
                    src={items.imageUrl}
                    alt=""
                    className="w-full md:w-[20%] h-auto object-cover rounded-lg mb-4 md:mb-0"
                  />
                  <div className="w-full md:w-[50%] text-white pl-0 md:pl-4 mb-4 md:mb-0">
                    <h1 className="text-2xl font-semibold">{items.title}</h1>
                    <p className="text-xl font-semibold text-green-500 lg:py-3">
                      {items.discountPercentage}% off
                    </p>
                    <p className="text-zinc-300">Author : {items.author}</p>
                    <p className="text-zinc-300">{items.language}</p>
                  </div>
                  <div className="w-full md:w-[30%] flex justify-between flex-col md:flex-row text-white text-left md:text-right">
                    <div className="flex flex-col md:flex-row md:gap-2">
                      <h1 className="text-xl font-semibold text-green-500 lg:px-3">
                        ₹ {items.discountPrice}
                      </h1>
                      <h1 className="text-xl font-semibold line-through">
                        ₹ {items.price}
                      </h1>
                    </div>
                    <Link
                      className="text-red-500 mt-2 md:mt-0 md:ml-4 bg-slate-300 p-1 rounded-lg"
                      onClick={() => handleDeleteCartBooks(items._id)}
                    >
                      <MdDeleteForever size={24} />
                    </Link>
                  </div>
                </div>
                <p className="text-zinc-300 mt-2">
                  {items.description.slice(0, 150)}...
                </p>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="w-full lg:w-[30%] bg-zinc-700 p-4 rounded-lg flex flex-col items-start lg:ml-4 h-[60vh]">
        <h2 className="text-2xl text-white mb-4">Price Details</h2>
        <hr className="w-full text-white py-4" />
        <div className="w-full py-3 text-xl text-semibold flex flex-col flex-grow">
          <div className="flex justify-between w-full mb-2">
            <h1>Total Items :</h1>
            <h1>{cartItems.length}</h1>
          </div>
          <div className="flex justify-between w-full mb-2">
            <h1>Total Amount :</h1>
            <h1 className="text-xl">₹{mainTotal}</h1>
          </div>
          <div className="flex justify-between w-full mb-2">
            <h1 className="text-xl">Discount :</h1>
            <h1 className="text-xl text-green-500">
              - ₹{mainTotal - totalPrice}
            </h1>
          </div>
          <div className="flex justify-between w-full mb-2">
            <h1 className="text-xl">Delivery Charge :</h1>
            <h1 className="text-xl text-green-500">Free</h1>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between w-full mb-2">
            <h1 className="text-xl">Total Amount :</h1>
            <h1 className="text-xl text-green-500">₹{totalPrice}</h1>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between w-full mt-auto border border-gray-300 rounded-md p-2">
            <Link
              onClick={placeOrder}
              className="w-full text-center text-white bg-green-500 py-2 rounded-md"
            >
              Check Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
