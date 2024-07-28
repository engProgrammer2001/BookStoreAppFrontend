import React, { useEffect, useState } from "react";
import BookCart from "../components/BookCart/BookCart";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { API_BASE_URL } from "../config/configApi";

const Books = () => {
  const [Data, setData] = useState();
//   console.log("Data is : ",Data);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
      (`${API_BASE_URL}admin/allbooks`)
      );
      setData(response.data
        .books);
    };
    fetchData();
  }, []);

  return (
    <div className="pt-28">
      <div>
        <div className="mt-8">
          <h1 className="text-3xl text-[#fc575cdd]">All Books From BookStore</h1>
          {!Data && (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          )}
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
    </div>
  );
};

export default Books;
