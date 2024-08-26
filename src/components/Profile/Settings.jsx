import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/configApi";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Change function
  const change = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({ ...prevValue, [name]: value }));
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${API_BASE_URL}user/profile`, {
        headers,
      });
      setProfileData(response.data.data);
      setValue({ address: response.data.data.address });
    };
    fetch();
  }, []);

  const submitAddress = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}user/change/address`,
        value,
        { headers }
      );
      alert(response.data.message);
      // Fetch updated profile data after successful update
      const updatedProfileResponse = await axios.get(
        `${API_BASE_URL}user/profile`,
        {
          headers,
        }
      );
      setProfileData(updatedProfileResponse.data.data);
      // Clear the textarea
      setValue({ address: "" });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex p-4 gap-4 flex-col lg:flex-row">
      {/* 1st div with 70% width */}
      <div className="w-full lg:w-[70%] bg-zinc-800 p-4 rounded">
        <h2 className="text-2xl text-gray-50 mb-4">Your Profile</h2>
        {!profileData && (
          <div className="w-full h-[100%] flex items-center justify-center">
            <Loader />
          </div>
        )}
        {profileData && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-50">Username:</label>
              <p className="p-2 bg-zinc-600 rounded">
                {profileData.username}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-50">Email:</label>
              <p className="p-2 bg-zinc-600 rounded">{profileData.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-50">Address:</label>
              <p className="p-2 bg-zinc-600 rounded">{profileData.address}</p>
            </div>
          </div>
        )}
      </div>

      {/* 2nd div with 30% width */}
      <div className="w-full lg:w-[30%] bg-zinc-800 p-4 rounded">
        <h2 className="text-2xl text-gray-50 mb-4">Update Information</h2>
        <div className="mb-4">
          <label className="block text-gray-50">Address:</label>
          <textarea
            name="address"
            className="w-full bg-zinc-600 p-2 border border-gray-300 rounded"
            rows="4"
            placeholder="Enter New Address"
            value={value.address}
            onChange={change}
          ></textarea>
        </div>
        <div>
          <Link
            onClick={submitAddress}
            className="bg-[#fc575cdd] text-white px-4 py-2 rounded hover:bg-[rgba(250,131,135,0.87)] w-full"
          >
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
