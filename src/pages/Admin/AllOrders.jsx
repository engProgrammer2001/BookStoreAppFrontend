import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { API_BASE_URL } from "../../config/configApi";
import Loader from "../../components/Loader/Loader";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TbBounceRightFilled } from "react-icons/tb";
import OrderPageUserData from "../../components/OrderPageUserData.jsx/OrderPageUserData";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [statusOptions, setStatusOptions] = useState(-1);
  const [userDiv, setUserDiv] = useState("hidden");
  const [UserDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}order/admin/order`, {
          headers,
        });
        setOrders(response.data.orderData);
        console.log("Orders: ", response.data.orderData);
      } catch (error) {
        console.log("Error fetching orders: ", error);
      }
    };
    fetchOrders();
  }, []);

  const lastIndex = currentPage * ordersPerPage;
  const firstIndex = lastIndex - ordersPerPage;
  const currentOrders = orders.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const setOptionsButton = (index) => {
    setStatusOptions(index);
  };

  const change = (e, orderId) => {
    const { value } = e.target;
    setSelectedStatuses({ ...selectedStatuses, [orderId]: value });
  };

  const submitChange = async (index, orderId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}order/admin/update/${orderId}`,
        { status: selectedStatuses[orderId] },
        {
          headers,
        }
      );
      console.log("response is: ", response);

      // Update the orders state with the new status
      const updatedOrders = [...orders];
      updatedOrders[firstIndex + index].status = selectedStatuses[orderId];
      setOrders(updatedOrders);

      // Reset the status options dropdown
      setStatusOptions(-1);
    } catch (error) {
      console.log("Error updating status: ", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mx-4">All Orders</h1>

      {/* count total order  */}
      <div className="w-full p-4 mb-4 bg-gray-800 text-white font-semibold text-center rounded-lg">
        Total Orders Till Now :
        <span className="text-red-500 text-2xl"> {orders.length}</span>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-center">
        <div className="w-full lg:w-[100%] rounded-lg flex flex-col mb-2 lg:mb-0">
          <div className="flex justify-center items-center">
            {!orders.length ? (
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
                        <div className="flex justify-center items-center h-full">
                          <FaUser className="text-2xl" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-zinc-700 text-white divide-y divide-gray-500">
                    {currentOrders.map((order, index) => (
                      <tr key={order._id}>
                        <td className="px-4 py-4 text-center text-sm font-bold">
                          {firstIndex + index + 1}
                        </td>
                        <td className="px-4 py-4 text-center text-sm">
                          <img
                            src={order?.book?.imageUrl}
                            alt="Book Image"
                            className="w-12 h-12 rounded-full object-cover mx-auto"
                          />
                        </td>
                        <td className="px-4 py-4 text-center text-sm font-bold">
                          {order?.book?.title.slice(0, 20)}...
                        </td>
                        <td className="px-4 py-4 text-center text-sm font-bold break-words">
                          {order?.book?.description.slice(0, 20)}...
                        </td>
                        <td className="px-4 py-4 text-center text-sm font-bold">
                          ₹ {order?.book?.discountPrice}
                        </td>
                        <td className="py-4 text-center text-white text-sm font-bold items-center">
                          <Link onClick={() => setOptionsButton(index)}>
                            {order.status === "Order Placed" ? (
                              <div className="text-gray-200">
                                {order.status}
                              </div>
                            ) : order.status === "Confirm Order" ? (
                              <div className="text-yellow-500">
                                {order.status}
                              </div>
                            ) : order.status === "Out For Delivery" ? (
                              <div className="text-blue-500">
                                {order.status}
                              </div>
                            ) : order.status === "Delivered Order" ? (
                              <div className="text-green-500">
                                {order.status}
                              </div>
                            ) : order.status === "Cancelled Order" ? (
                              <div className="text-red-500">{order.status}</div>
                            ) : null}
                          </Link>
                          {statusOptions === index && (
                            <div className="flex">
                              <select
                                name="status"
                                id=""
                                className="bg-gray-700"
                                onChange={(e) => change(e, order._id)}
                                value={
                                  selectedStatuses[order._id] || order.status
                                }
                              >
                                {[
                                  "Order Placed",
                                  "Confirm Order",
                                  "Out For Delivery",
                                  "Delivered Order",
                                  "Cancelled Order",
                                ].map((statusOption, idx) => (
                                  <option value={statusOption} key={idx}>
                                    {statusOption}
                                  </option>
                                ))}
                              </select>
                              <Link
                                className="ml-2 items-center"
                                onClick={() => submitChange(index, order._id)}
                              >
                                <TbBounceRightFilled
                                  size={22}
                                  className="text-green-500"
                                />
                              </Link>
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center text-sm font-bold">
                          <Link
                            onClick={() => {
                              setUserDiv("fixed");
                              setUserDivData(order.user);
                            }}
                            className="flex justify-center items-center h-full"
                          >
                            <FaExternalLinkAlt className="text-2xl" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {orders.length > 0 && (
            <div className="flex justify-between mt-2">
              <Link
                to="#"
                onClick={handlePrevPage}
                className={`px-4 py-2 bg-gray-700 hover:bg-gray-500 transition-all text-white rounded-lg ${
                  currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Previous
              </Link>
              <Link
                to="#"
                onClick={handleNextPage}
                className={`px-4 py-2 bg-gray-700 hover:bg-gray-500 transition-all text-white rounded-lg ${
                  currentPage === totalPages
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                Next
              </Link>
            </div>
          )}

          {UserDivData && (
            <OrderPageUserData
              UserDivData={UserDivData}
              userDiv={userDiv}
              setUserDiv={setUserDiv}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
