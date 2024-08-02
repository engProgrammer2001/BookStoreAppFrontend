import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ data }) => {
  // console.log("data is : ", data);
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
          <p className="text-white text-lg mt-2">{data.data.email}</p>
        </div>
        <hr className="w-full border-t border-white-400 my-8" />
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

        {/* <!-- Logout Button --> */}
        <div className="mt-8">
          <Link className="text-lg text-white w-full bg-slate-900 hover:bg-gray-800 px-12 py-2 rounded">
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
