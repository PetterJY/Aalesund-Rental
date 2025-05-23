import React, { useEffect, useState, useRef} from "react";
import { getAccountId, makeApiRequest } from "../../utils/JwtUtility";
import CarDisplay from "../../Rental/CarDisplay/CarDisplay";
import CarSelected from "../../Rental/CarSelected/CarSelected";
import "./Favourites.css";

const Favourites = () => {
  const [favouriteCars, setFavouriteCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [carsPerRow, setCarsPerRow] = useState(3);
  const containerRef = useRef(null);

  useEffect(() => {
    async function fetchFavourites() {
      setIsLoading(true);
      try {
        const data = await makeApiRequest(`http://localhost:8080/api/users/${getAccountId()}/favourites`);
        
        // Ensure data is an array
        setFavouriteCars(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching favourites:", error);
        setFavouriteCars([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFavourites();
  }, []);

    const getCarsPerRow = () => {
    const container = containerRef.current;
    if (!container) return 1;
    const containerWidth = container.offsetWidth;
    const firstItem = container.querySelector(".car-display");
    if (!firstItem) return 1;
    const itemWidth = firstItem.offsetWidth;
    return Math.floor((containerWidth + 10) / (itemWidth + 10));
  };

  useEffect(() => {
    const updateCarsPerRow = () => {
      setCarsPerRow(getCarsPerRow());
    };
    updateCarsPerRow();
    window.addEventListener("resize", updateCarsPerRow);
    return () => window.removeEventListener("resize", updateCarsPerRow);
  }, [favouriteCars]);

  const handleCarClick = (carId) => {
    setSelectedCarId((prev) => (prev === carId ? null : carId));
  };

    const renderWithInsertedMenu = () => {
    if (!Array.isArray(favouriteCars) || favouriteCars.length === 0) return null;

    const selectedIndex = favouriteCars.findIndex((car) => car.id === selectedCarId);
    let insertionIndex = -1;
    if (selectedIndex >= 0) {
      insertionIndex = Math.ceil((selectedIndex + 1) / carsPerRow) * carsPerRow - 1;
      insertionIndex = Math.min(insertionIndex, favouriteCars.length - 1);
    }

    const combined = [];
    favouriteCars.forEach((car, index) => {
      combined.push(
        <CarDisplay
          key={car.id}
          displayCar={car}
          onClick={() => handleCarClick(car.id)}
          isSelected={car.id === selectedCarId}
        />
      );
        if (index === insertionIndex && selectedCarId) {
          const selectedCar = favouriteCars.find((car) => car.id === selectedCarId);
          combined.push(
            <div key={`menu-${selectedCarId}`} className="car-selected-menu">
              <CarSelected car={selectedCar} />
            </div>
          );
        }
    });

    return combined;
  };

  return (
    <section className="favourites-container">
      <h2 className="title">My Favourite Cars</h2>
      {isLoading ? (
      <p aria-live="polite">Loading favourites...</p>
      ) : favouriteCars.length === 0 ? (
        <div className="no-favourites-message">
          <p>You have no favourite cars yet.</p>
        </div>
      ) : (
      <div className="favourites-list" ref={containerRef} role="list">
        {renderWithInsertedMenu()}
      </div>
      )}
    </section>
  );
};

export default Favourites;