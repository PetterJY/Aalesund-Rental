import "../../App.css";
import "./CarDisplay.css";
import React, { useState, useEffect } from "react";
import carImage from "../../../resources/images/car.png"; 
import passengerImage from "../../../resources/images/passenger.png";
import { Car, Seatbelt, PlusCircle, CaretDown } from "@phosphor-icons/react";

const CarDisplay = ({ displayCar: car, isSelected, onClick }) => {

    if (!car) {
      return <div>Loading...</div>;
    }

  return (
    <button className={`car-display ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <section className="top-section">
        <section className="top-left-section">
          <h2 className="car-name">{car.carBrand} {car.carModel}</h2>
          <aside className="passenger-tag">
            <Seatbelt size={24} color="#ffffff" weight="fill"/>
            <h2 className="passenger-count">{car.passengers}</h2>
          </aside>
        </section>
        <section className="top-right-section">
          <article className="car-tag">{car.energySource}</article>
        </section>
      </section>

      <img id="car-image" src={carImage} alt="car-image"></img>
      {isSelected && (
        <div className="selected-arrow">
          <CaretDown size={24} color="#EB5E28" weight="fill" />
        </div>
      )}
      <section className="bottom-section">
      <h2 className="rental-place">
          {car.provider.companyName}
        </h2>
        <section className="price-section">
          <h2 id="price-day">{car.pricePerDay},-kr/dag</h2>
          <h2 id="price-total">{car.priceTotal},-kr/total</h2>
        </section>
      </section>
    </button> 
  )
}

export default CarDisplay;