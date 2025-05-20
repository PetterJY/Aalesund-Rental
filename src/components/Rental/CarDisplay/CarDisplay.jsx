import "./CarDisplay.css";
import React, { useState, useEffect } from "react";
import { getAccountId } from "../../utils/JwtUtility";
import { mapCarImage } from '../../utils/CarImageMapper';
import passengerImage from "../../../resources/images/passenger.png";
import { Car, Seatbelt, PlusCircle, CaretDown, Star } from "@phosphor-icons/react";

const CarDisplay = ({ displayCar: car, isSelected, onClick, role }) => {
  const [isFavourited, setIsFavourited] = useState(false);
  const carImage = mapCarImage(car.carBrand, car.modelName);
  const rentalDays = car.rentalDays || 1; // fallback to 1 if not present
  const totalPrice = car.priceTotal || (car.pricePerDay * rentalDays);

  const visibileStar = role === "ROLE_USER" ? true : false;
  
  useEffect(() => {
    if (role !== "ROLE_USER") {
      console.warn("Account is not of ROLE_USER.");
      return;
    }

    if (!car) return;

    const fetchIsFavourited = async () => {
      try {
        const accountId = getAccountId();
        const response = await fetch(`http://localhost:8080/users/${accountId}/favourites`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (response.ok) {
          const favourites = await response.json();
          setIsFavourited(favourites.some(favCar => favCar.id === car.id));
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchIsFavourited();
  }, [car]);

  const handleToggleFavourite = async (e) => {
    e.stopPropagation();

    if (role !== "ROLE_USER") {
      console.warn("Account is not of ROLE_USER.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/users/${getAccountId()}/favourites/${car.id}`, {
        method : isFavourited ? "DELETE" : "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      if (response.ok) {
        setIsFavourited(!isFavourited);
      }
    } catch (err) {
      // Optionally handle error
    }
  };
  
  if (!car) {
    return <div>Loading...</div>;
  }
  return (
    <button className={`car-display ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <section className="top-section">
        <section className="top-left-section">
          <h2 className="car-name">{car.carBrand} {car.modelName}</h2>
          <aside className="passenger-tag">
            <Seatbelt size={24} color="#ffffff" weight="fill"/>
            <h3 className="passenger-count">{car.passengers}</h3>
          </aside>
        </section>
        <section className="top-right-section">
          <article className="car-tag">{car.energySource}</article>
          {visibileStar && (
            <button
              className={`favourite-btn${isFavourited ? " favourited" : ""}`}
              onClick={handleToggleFavourite}
              aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
            >
              <Star
                size={28}
                color={isFavourited ? "#eee" : "#EEE"}
                weight={isFavourited ? "fill" : "regular"}
              />
            </button>
          )}
        </section>
      </section>

      <img 
        src={carImage}
        alt={`${car.carBrand} ${car.modelName}`}
        className="car-image" 
      />
      {isSelected && (
        <div className="selected-arrow">
          <CaretDown size={24} color="var(--secondary-color)" weight="fill" />
        </div>
      )}
      
      <section className="bottom-section">
      <h3 className="rental-place">
          {car.provider.companyName}
        </h3>
        <section className="price-section">
          <h4 id="price-day">{car.pricePerDay},-kr/dag</h4>
          <h4 id="price-total">{totalPrice},-kr/total</h4>      
        </section>
      </section>
    </button> 
  )
}

export default CarDisplay;