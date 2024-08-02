import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/configApi";
import BookCart from "../BookCart/BookCart";
import FavouritesCart from "../favourites/FavouritesCart";

const Favourites = () => {
  const [favouritesBook, setFavouritesBook] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}favourite`, {
          headers,
        });
        console.log("API response:", response.data); // Log the response to check its structure
        const userData = response.data.userData.favourites;
        console.log("userData is: ", userData);
        // Ensure userData is an array
        setFavouritesBook(Array.isArray(userData) ? userData : []);
      } catch (error) {
        console.error("Error: ", error);
        alert(error.response?.data?.message || "An error occurred");
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <div>
        {favouritesBook &&
          favouritesBook.map((items, i) => (
            <div key={i}>
              <FavouritesCart data={items} />
            </div>
          ))}
      </div>
    </div>
  );s
};

export default Favourites;
