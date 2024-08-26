import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/configApi";


const AddBooks = () => {
  const [value, setValue] = useState({
    imageUrl: "",
    title: "",
    author: "",
    language: "",
    publishedDate: "",
    category: "",
    price: "",
    discountPrice: "",
    discountPercentage: "",
    description: "",
  });

  const [error, setError] = useState("");

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = [
      "imageUrl",
      "title",
      "author",
      "language",
      "publishedDate",
      "category",
      "price",
      "discountPrice",
      "discountPercentage",
      "description",
    ];

    for (let field of requiredFields) {
      if (!value[field]) {
        setError(`The field "${field}" is required.`);
        return false;
      }
    }

    setError(""); // Clear any previous error if form is valid
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Don't submit the form if validation fails
    }

    try {
      const response = await axios.post(`${API_BASE_URL}admin/addbook`, value, {
        headers,
      });
      alert(response.data.message);
      console.log("response is: ", response);
    } catch (error) {
      console.log("Error: ", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="w-full bg-zinc-700 text-white p-4 rounded-md">
      <div className="w-full mx-auto">
        <h1 className="text-3xl mb-4 underline">Add Book</h1>

        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">Image URL</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#212529] text-white"
            placeholder="Enter Image URL"
            name="imageUrl"
            onChange={change}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">
            Title of Book
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#212529] text-white"
            placeholder="Enter Title of Book"
            name="title"
            onChange={change}
            required
          />
        </div>
        <div className="mb-4 flex justify-between space-x-4">
          <div className="w-full lg:w-1/2">
            <label className="block text-lg font-medium mb-1">
              Author of Book
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#212529] text-white"
              placeholder="Enter Author of Book"
              name="author"
              onChange={change}
              required
            />
          </div>
          <div className="w-full lg:w-1/2">
            <label className="block text-lg font-medium mb-1">
              Language of Book
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#212529] text-white"
              placeholder="Enter Language of Book"
              name="language"
              onChange={change}
              required
            />
          </div>
        </div>
        <div className="mb-4 flex justify-between space-x-4">
          <div className="w-full lg:w-1/2">
            <label className="block text-lg font-medium mb-1">
              Date of Publish
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#212529] text-white"
              placeholder="Enter Date of Publish"
              name="publishedDate"
              onChange={change}
              required
            />
          </div>
          <div className="w-full lg:w-1/2">
            <label className="block text-lg font-medium mb-1">Category</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#212529] text-white"
              placeholder="Enter Category"
              name="category"
              onChange={change}
              required
            />
          </div>
        </div>
        <div className="mb-4 flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-1/3">
            <label className="block text-lg font-medium mb-1">Price</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#212529] text-white"
              placeholder="Enter Price"
              name="price"
              onChange={change}
              required
            />
          </div>
          <div className="w-full lg:w-1/3">
            <label className="block text-lg font-medium mb-1">
              Discounted Price
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#212529] text-white"
              placeholder="Enter Discounted Price"
              name="discountPrice"
              onChange={change}
              required
            />
          </div>
          <div className="w-full lg:w-1/3">
            <label className="block text-lg font-medium mb-1">
              Discount Percentage
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#212529] text-white"
              placeholder="Enter Discount Percentage"
              name="discountPercentage"
              onChange={change}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-1">
            Description of Book
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-[#212529] text-white"
            placeholder="Enter Description of Book"
            name="description"
            onChange={change}
            required
          ></textarea>
        </div>
        <Link
          to=""
          className="w-full block text-center py-3 bg-[#fc575cdd] hover:bg-[rgba(250,131,135,0.87)] text-white text-lg rounded-md"
          onClick={submit}
        >
          ADD BOOK
        </Link>
      </div>
    </div>
  );
};

export default AddBooks;
