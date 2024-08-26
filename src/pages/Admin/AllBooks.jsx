import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/configApi";
import Loader from "../../components/Loader/Loader";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [Data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Calculate the current books to display
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = Data.slice(indexOfFirstBook, indexOfLastBook);

  // Handle Pagination
  const handleNextPage = (e) => {
    if (indexOfLastBook < Data.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      e.preventDefault(); // Prevent navigation if no more pages
    }
  };

  const handlePrevPage = (e) => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      e.preventDefault(); // Prevent navigation if on the first page
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}admin/delete/books/${bookId}`,
        { headers }
      );
      console.log("delete response is: ", response);
      alert(response.data.message);

      // Update the Data state to remove the deleted book
      setData((prevData) => prevData.filter((book) => book._id !== bookId));
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_BASE_URL}admin/allbooks`);
      setData(response.data.books);
      // console.log("response is: ", response.data.books);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        {/* Heading */}
        <h1 className="text-2xl font-bold mx-4">All Books</h1>
        {/* count total order  */}
      <div className="w-full p-4 mb-4 bg-gray-800 text-white font-semibold text-center rounded-lg">
        Total Books Added Till Now : <span className="text-red-500 text-2xl">{Data.length}</span>
      </div>

        <div className="w-full flex flex-col lg:flex-row justify-center">
          <div className="w-full lg:w-[100%] p-4 rounded-lg flex flex-col mb-4 lg:mb-0">
            <div className="flex justify-center items-center">
              {!Data.length ? (
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
                          image
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
                          Update
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-bold text-gray-50 uppercase tracking-wider">
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-zinc-700 text-white divide-y divide-gray-500">
                      {currentBooks.map((book, index) => (
                        <tr key={book._id}>
                          <td className="px-2 py-4 text-center text-sm font-bold">
                            {indexOfFirstBook + index + 1}
                          </td>
                          <td className="px-2 py-4 text-center text-sm font-bold">
                            <img
                              src={book.imageUrl}
                              alt=""
                              className="w-[50px] h-[50px] rounded-full"
                            />
                          </td>
                          <td className="px-2 py-4 text-center text-sm font-bold">
                            {book.title}
                          </td>
                          <td className="px-2 py-4 text-center text-sm font-bold break-words">
                            {book.description.slice(0, 50)}
                          </td>
                          <td className="px-2 py-4 text-center text-sm font-bold">
                            ₹ {book.discountPrice}
                          </td>
                          <td className="px-2 py-4 text-center text-sm font-bold text-green-500 cursor-pointer">
                            <Link
                              to={`/update/${book._id}`}
                              className="text-black bg-yellow-400 px-4 py-1 border rounded-full"
                            >
                              Update
                            </Link>
                          </td>
                          <td className="px-2 py-4 text-center text-sm font-bold">
                            <button
                              onClick={() => handleDeleteBook(book._id)}
                              className="text-white bg-[#fc575cdd] px-4 py-1 border rounded-full"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-700 text-white rounded">
              <Link
                to="#"
                onClick={handlePrevPage}
                className={`px-4 py-2 mx-1 bg-zinc-500 text-white rounded ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </Link>
              <Link
                to="#"
                onClick={handleNextPage}
                className={`px-4 py-2 mx-1 bg-zinc-500 text-white rounded ${
                  indexOfLastBook >= Data.length
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
