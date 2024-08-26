import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/configApi";
import Loader from "../../components/Loader/Loader";
import { FcViewDetails } from "react-icons/fc";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}user/alluser`, {
          headers,
        });
        setUsers(response.data.users);
        console.log("Users: ", response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Filter out admin users for count and display
  const filteredUsers = users.filter(user => user.role !== 'admin');
  const totalUserCount = filteredUsers.length;

  return (
    <div>
      {/* Heading */}
      <h1 className="text-2xl font-bold mx-4">All Users</h1>
      {/* count total orders */}
      <div className="w-full p-4 mb-4 bg-gray-800 text-white font-semibold text-center rounded-lg">
        Total User Till Now :{" "}
        <span className="text-red-500 text-2xl">{totalUserCount}</span>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-center">
        <div className="w-full lg:w-[100%] p-4 rounded-lg flex flex-col mb-4 lg:mb-0">
          <div className="flex justify-center items-center">
            {!filteredUsers.length ? (
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
                        User Name
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-50 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-50 uppercase tracking-wider">
                        Create Date
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-bold text-gray-50 uppercase tracking-wider">
                        More Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-zinc-700 text-white divide-y divide-gray-500">
                    {filteredUsers.map((user, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-center text-sm font-bold">
                          {index + 1}
                        </td>
                        <td className="px-4 py-4 text-center text-sm font-bold">
                          <img
                            src={user.avatar}
                            alt="User"
                            className="h-10 w-10 rounded-full object-cover mx-auto"
                          />
                        </td>
                        <td className="px-4 py-4 text-center text-sm font-bold">
                          {user.username}
                        </td>
                        <td className="px-4 py-4 text-center text-sm font-bold break-words">
                          {user.email}
                        </td>
                        <td className="px-4 py-4 text-center text-sm font-bold">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-center text-sm font-bold text-blue-500 cursor-pointer">
                          <FcViewDetails
                            size={24} // Increase the size of the icon
                            onClick={() => handleViewDetails(user)}
                            className="mx-auto"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {filteredUsers.length === 0 && (
            <div className="flex justify-center">
              <h1 className="text-2xl">No Users Found</h1>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="text-xl bg-white p-6 rounded shadow-lg w-[90%] max-w-md text-gray-800">
            <h2 className="text-xl font-bold mb-4 text-center">User Details</h2>
            <div className="flex flex-col items-center mb-4">
              <img
                className="h-28 w-28 rounded-full object-cover mb-4"
                src={selectedUser.avatar}
                alt="User Avatar"
              />
            </div>
            <p className="pt-2">
              <strong>ID:</strong> {selectedUser._id}
            </p>
            <p className="pt-2">
              <strong>UserName:</strong> {selectedUser.username} <br />
              <strong>Role:</strong>{" "}
              <span
                className={`font-bold ${
                  selectedUser.role === "admin"
                    ? "text-red-500"
                    : "text-gray-800"
                }`}
              >
                {selectedUser.role}
              </span>
            </p>
            <p className="pt-2">
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p className="pt-2">
              <strong>Created At:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleDateString()}
            </p>
            <p className="pt-2">
              <strong>Complete Address:</strong> {selectedUser.address}
            </p>
            <p className="pt-2">
              <strong>Total Book In Cart:</strong>{" "}
              {selectedUser.cart.length > 0 ? selectedUser.cart.length : 0}
            </p>
            <p className="pt-2">
              <strong>Favourites Books:</strong>{" "}
              {selectedUser.favourites.length > 0
                ? selectedUser.favourites.length
                : 0}
            </p>
            <p className="pt-2">
              <strong>Total Books Orders:</strong>{" "}
              {selectedUser.orders.length > 0 ? selectedUser.orders.length : 0}
            </p>
            <div className="flex justify-end">
              <Link
                to="#"
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Close
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
