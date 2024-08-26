import React from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const OrderPageUserData = ({ UserDivData, userDiv, setUserDiv }) => {
  const totalOrders = UserDivData.orders.length;
  let orderStatus = "";
  let orderColor = "";

  if (totalOrders < 10) {
    orderStatus = "Low Number Of order";
    orderColor = "text-blue-500";
  } else if (totalOrders >= 10 && totalOrders <= 20) {
    orderStatus = "Average Number of order";
    orderColor = "text-yellow-500";
  } else if (totalOrders > 20) {
    orderStatus = "High Number of order";
    orderColor = "text-green-500";
  }

  return (
    <div className="pt-32">
      <div
        className={`${userDiv} top-52 left-0 w-full bg-black opacity-30`}
      ></div>
      <div
        className={`${userDiv} top-52 left-0 w-full flex items-center justify-center`}
      >
        <div className="bg-white p-4 rounded-lg w-[80%] md:w-[50%] lg:w-[40%] text-zinc-800 relative">
          <div className="flex justify-center items-center relative">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <Link onClick={() => setUserDiv("hidden")} className="absolute right-0">
              <RxCross1 />
            </Link>
          </div>
          <div className="mt-2 flex justify-center">
            <img
              src={UserDivData.avatar}
              alt=""
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div className="mt-4">
            <label className="font-bold">UserName :</label>
            <span className="ml-2 font-semibold">{UserDivData.username}</span>
          </div>
          <div className="mt-2">
            <label className="font-bold">Email :</label>
            <span className="ml-2 font-semibold">{UserDivData.email}</span>
          </div>
          <div className="mt-2">
            <label className="font-bold">Delivery Address :</label>
            <span className="ml-2 font-semibold">{UserDivData.address}</span>
          </div>
          <div className="mt-2 flex items-center">
            <label className="font-bold">Total Orders :</label>
            <span className="ml-2 font-semibold">{totalOrders}</span>
            <span className={`ml-4 font-semibold ${orderColor}`}>
              {orderStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPageUserData;
