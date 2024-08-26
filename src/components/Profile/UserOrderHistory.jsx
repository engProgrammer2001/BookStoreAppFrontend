import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/configApi";
import { Link } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6; // Number of orders to show per page

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
      // console.log("response is", response.data.orderData);
    };
    fetch();
  }, []);

  // Calculate the index of the first and last order on the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderHistory.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(orderHistory.length / ordersPerPage);

  // Handle pagination
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Function to get the color class based on order status
  const getStatusColor = (status) => {
    switch (status) {
      case "Order placed":
        return "text-gray-200";
      case "Confirm Order":
        return "text-yellow-500";
      case "Out For Delivery":
        return "text-blue-500";
      case "Delivered Order":
        return "text-green-500";
      case "Cancelled Order":
        return "text-red-500";
      default:
        return "text-white";
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center">
      <div className="w-full lg:w-[100%] p-4 rounded-lg flex flex-col mb-4 lg:mb-0">
        <div className="flex justify-center items-center">
          {!orderHistory.length ? (
            <div className="w-full h-[100%] flex items-center justify-center">
              {/* <Loader /> */}
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
                      Image
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
                  {currentOrders.map((order, index) => (
                    <tr key={order._id}>
                      <td className="px-4 py-4 text-center text-sm font-bold">
                        {indexOfFirstOrder + index + 1}
                      </td>
                      <td className="px-4 py-4 text-center text-sm font-bold">
                        {order.book?.imageUrl ? (
                          <img
                            src={order.book.imageUrl}
                            alt={order.book.title}
                            className="h-20 w-20 object-cover mx-auto rounded-full"
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td className="px-4 py-4 text-center text-sm font-bold">
                        {order.book?.title.slice(0, 20) || "N/A"}
                      </td>
                      <td className="px-4 py-4  text-sm font-bold break-words">
                        {order.book?.description?.length > 30
                          ? `${order.book.description.slice(0, 30)}...`
                          : order.book?.description ||
                            "No description available"}
                      </td>
                      <td className="px-4 py-4 text-center text-sm font-bold">
                        ₹ {order.book?.discountPrice || "N/A"}
                      </td>
                      <td
                        className={`px-4 py-4 text-center text-sm font-bold cursor-pointer ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </td>
                      <td className="px-4 py-4 text-center text-sm font-bold">
                        COD
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between items-center p-4">
                <Link
                  to="#"
                  onClick={() => paginate(currentPage - 1)}
                  className={`flex items-center px-4 py-2 bg-gray-700 text-white rounded ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <GrFormPrevious className="mr-2" />
                  Previous
                </Link>
                <Link
                  to="#"
                  onClick={() => paginate(currentPage + 1)}
                  className={`flex items-center px-4 py-2 bg-gray-700 text-white rounded ${
                    currentPage === totalPages
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  Next
                  <MdOutlineNavigateNext className="ml-2" />
                </Link>
              </div>
            </div>
          )}
        </div>
        {orderHistory.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl mb-4">No Order History</h1>
            <img
              className="w-[50%]"
              src="/images/no_Order.png"
              alt="empty Order"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrderHistory;
