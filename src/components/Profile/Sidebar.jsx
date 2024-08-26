import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { MdLogout } from "react-icons/md";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Access isLoggedIn state

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/"); 
  };

  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/"); 
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <div className="bg-zinc-700 p-4 rounded flex flex-col items-center">
        <div className="flex flex-col justify-center items-center pt-6">
          <img
            className="m-auto rounded-full"
            src={data.data.avatar}
            alt="avatar"
            width={"200px"}
            height={"200px"}
          />
          <p className="text-white text-2xl mt-4">{data.data.username}</p>
          <p className="text-white text-2xl mt-4">Role : {data.data.role}</p>
          <p className="text-white text-lg mt-2">Email : {data.data.email}</p>
        </div>
        <hr className="w-full border-t border-white-400 my-8" />

        {role === "user" && (
          <div className="flex flex-col items-center">
            <Link
              to=""
              className="text-white text-xl my-2 hover:bg-gray-800 hover:px-8 py-2 rounded"
            >
              Favourites
            </Link>
            <Link
              to="/profile/orderhistory"
              className="text-white text-xl my-2 hover:bg-gray-800 hover:px-8 py-2 rounded"
            >
              Order History
            </Link>
            <Link
              to="/profile/setting"
              className="text-white text-xl my-2 hover:bg-gray-800 hover:px-8 py-2 rounded"
            >
              Settings
            </Link>
          </div>
        )}

        {role === "admin" && (
          <div className="flex flex-col items-center">
            <Link
              to=""
              className="text-white text-xl my-2 hover:bg-gray-800 hover:px-8 py-2 rounded"
            >
              All Order
            </Link>
            <Link
              to="/profile/all-book"
              className="text-white text-xl my-2 hover:bg-gray-800 hover:px-8 py-2 rounded"
            >
              All Books
            </Link>
            <Link
              to="/profile/all-users"
              className="text-white text-xl my-2 hover:bg-gray-800 hover:px-8 py-2 rounded"
            >
              All Users
            </Link>
            <Link
              to="/profile/add-books"
              className="text-white text-xl my-2 hover:bg-gray-800 hover:px-8 py-2 rounded"
            >
              Add Books
            </Link>
          </div>
        )}

        {/* Logout Button */}
        <div className="mt-8">
          <Link
            onClick={handleLogout}
            className="flex items-center justify-center text-lg text-white w-full bg-slate-900 hover:bg-gray-800 px-12 py-2 rounded"
          >
            Log Out <MdLogout className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
