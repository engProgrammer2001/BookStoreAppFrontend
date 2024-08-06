import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/configApi";
import Loader from "../Loader/Loader";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${API_BASE_URL}order/user/order`, {
        headers,
      });
      setOrderHistory(response.data.orderData);
      console.log("response is", response.data.orderData);
    };
    fetch();
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center">
      <div className="w-full lg:w-[100%] p-4 rounded-lg flex flex-col mb-4 lg:mb-0">
        <div className="flex justify-center items-center">
          {!orderHistory?.length ? (
            <div className="w-full h-[100%] flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="w-full bg-zinc-500 overflow-auto">
              <table className="w-full table-fixed divide-y divide-gray-200">
                <thead className="bg-gray-500">
                  <tr>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-50 uppercase tracking-wider">
                      S.NO.
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-50 uppercase tracking-wider">
                      Book Title
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-50 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-50 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-50 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-50 uppercase tracking-wider">
                      Mode
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-zinc-700 text-white divide-y divide-gray-500">
                  {orderHistory.map(
                    (order, index) => (
                      console.log("order is", order),
                      (
                        <tr key={order._id}>
                          <td className="px-6 py-4 text-center text-sm font-bold">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 text-center text-sm font-bold">
                            {order.book.title}
                          </td>
                          <td className="px-6 py-4 text-center text-sm font-bold break-words">
                            {order.book.description?.length > 50
                              ? `${order.book.description.slice(0, 50)}`
                              : order.book.description}
                          </td>
                          <td className="px-6 py-4 text-center text-sm font-bold">
                          ₹ {order.book.discountPrice}
                          </td>
                          <td className="px-6 py-4 text-center text-sm font-bold text-green-600 cursor-pointer">
                            Order Placed
                          </td>
                          <td className="px-6 py-4 text-center text-sm font-bold">
                            COD
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {orderHistory?.length === 0 && (
          <div className="flex justify-center">
            <img src="images/cart.png" alt="empty cart" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrderHistory;
