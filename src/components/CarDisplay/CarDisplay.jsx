import "../global.css";
import "./CarDisplay.css";
import React, { useState } from "react";
import carImage from "../../resources/images/car.png"; 
import passengerImage from "../../resources/images/passenger.png";

const CarDisplay = (props) => {
  return (
    <button className="car-display" onClick={props.onClick}>
      <section className="top-section">
        <section className="top-left-section">
          <h2 className="car-name">{props.carName}</h2>
          <aside className="passenger-tag">
            <img id="passenger-image" src={passengerImage} alt="Passenger" />
            <h2 className="passenger-count">{props.passengerCount}</h2>
          </aside>
        </section>
        <section className="top-right-section">
          <article className="car-tag">{props.carTag}</article>
        </section>
      </section>

      <img id="car-image" src={carImage} alt="car-image"></img>
      <section className="bottom-section">
        <h2 className="rental-place">{props.rentalPlace}</h2>
        <section className="price-section">
          <h2 id="price-day">{props.priceDay}/dag</h2>
          <h2 id="price-total">{props.priceTotal}/total</h2>
        </section>
      </section>
    </button> 
  )
}

export default CarDisplay;