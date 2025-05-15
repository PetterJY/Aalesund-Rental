import React, { useEffect, useState } from "react";
import { getAccountId } from "../../utils/JwtUtility";
import CarDisplay from "../../Rental/CarDisplay/CarDisplay";
import "./Favourites.css";

const Favourites = () => {
  const [favouriteCars, setFavouriteCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch favourite cars for the current user
    async function fetchFavourites() {
      setIsLoading(true);
      try {
          const response = await fetch(
            `http://localhost:8080/users/${getAccountId()}/favourites`,
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
        if (!response.ok) {
          console.error("Failed to fetch favourites:", response.statusText);
          setFavouriteCars([]);
        } else {
          const data = await response.json();
          setFavouriteCars(data);
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
        setFavouriteCars([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFavourites();
  }, []);

  return (
    <section className="favourites-container">
      <h2 className="title">My Favourite Cars</h2>
      {isLoading ? (
        <p>Loading favourites...</p>
      ) : favouriteCars.length === 0 ? (
        <div className="no-favourites-message">
          <p>You have no favourite cars yet.</p>
        </div>
      ) : (
        <div className="favourites-list">
          {favouriteCars.map((car) => (
            <CarDisplay key={car.id} displayCar={car} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favourites;