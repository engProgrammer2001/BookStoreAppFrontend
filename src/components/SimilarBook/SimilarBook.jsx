import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCart from "../BookCart/BookCart";
import Loader from "../Loader/Loader";
import { API_BASE_URL } from "../../config/configApi";

const SimilarBook = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${API_BASE_URL}admin/allbooks`);
      setData(response.data.books);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div>
        <div className="mt-4">
          <h1 className="text-3xl text-[#fc575cdd]">Some Similar Books</h1>
          {!Data && (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          )}
          <div className="my-4 text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Data &&
              Data.slice(0, 8).map((items, i) => (
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

export default SimilarBook;
