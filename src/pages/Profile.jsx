import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../config/configApi";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${API_BASE_URL}user/profile`, {
        headers,
      });
      setProfile(response.data);
    };
    fetch();
  }, []);

  return (
    <div className="pt-32">
      <div>
        <div className="px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4">
          {/* define Loader here  */}
          {!profile && <div className="w-full flex justify-center items-center"> <Loader /></div>}
          {profile && (
            <>
            <div className="w-full md:w-2/6 ">
              <Sidebar data={profile} />
            </div>
            <div className="w-full md:w-4/6 ">
              <Outlet />
            </div>
          </>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
