import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCart from "../BookCart/BookCart";

const RecentlyAdded = () => {
  const [Data, setData] = useState();
//   console.log("Data is : ",Data);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:1000/admin/recentbooks"
      );
      setData(response.data.recentBooks);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="mt-8 border border-green-500 p-8 bg-gray-600">
        <h1 className="text-3xl text-[#fc575cdd]">Recently Added Books</h1>
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
