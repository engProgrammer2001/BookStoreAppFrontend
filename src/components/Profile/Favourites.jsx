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
        const userData = response.data.userData.favourites;
        // Ensure userData is an array
        setFavouritesBook(Array.isArray(userData) ? userData : []);
      } catch (error) {
        console.error("Error: ", error);
        // alert(error.response?.data?.message || "An error occurred");
      }
    };
    fetch();
  }, [favouritesBook]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  }}>
      <div>
        {favouritesBook.length === 0 && (
          <>
            <img src="/images/Oops.png" alt="No Books" width="300px" height="300px" />
          </>
        )}
        {favouritesBook &&
          favouritesBook.map((items, i) => (
            <div key={i}>
              <FavouritesCart data={items} favourites={true} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favourites;
