import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCart from "../BookCart/BookCart";
import Loader from "../Loader/Loader";
import { API_BASE_URL } from "../../config/configApi";

const RecentlyAdded = () => {
  const [Data, setData] = useState();
//   console.log("Data is : ",Data);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${API_BASE_URL}admin/recentbooks`
      );
      setData(response.data.recentBooks);
    };
    fetchData();
  }, []);

  return (
    <div className="m-2">
      <div className="m-auto mt-8 border rounded-lg border-green-500 p-4 bg-gray-600">
        <h1 className="text-3xl font-family: 'Dancing Script', cursive underline">Recently Added Books</h1>
        {!Data && ( <div className="flex justify-center items-center"><Loader/></div>)}
        <div className="my-4 text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Data &&
            Data?.map((items, i) => (
              <div key={i}>
                <BookCart data={items} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RecentlyAdded;
