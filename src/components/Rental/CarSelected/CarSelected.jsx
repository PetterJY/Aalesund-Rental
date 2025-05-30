import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { mapCarImage } from '../../utils/CarImageMapper';
import { Car, Seatbelt, PlusCircle, Calendar, CaretDown } from "@phosphor-icons/react";
import './CarSelected.css';
import {BookingContext} from "../../utils/BookingContext";

const CarSelected = ({car}) => {
  const navigate = useNavigate();
  const [showFeatures, setShowFeatures] = useState(false); // State to toggle extra features

  const { bookingData : rentalDetails } = useContext(BookingContext);

  const totalPrice = Math.imul((rentalDetails.dropoffDate - rentalDetails.pickupDate) / (1000 * 60 * 60 * 24),
    car.pricePerDay)

  const handleRentCar = () => {
    console.log(`Renting car with ID: ${car.id}`);
    navigate(`/booking/${car.id}`);
  };

  const showExtraFeatures = () => {
    setShowFeatures(!showFeatures); // Toggle the visibility of extra features
  };

  const carImage = mapCarImage(car.carBrand, car.modelName);

  return (
    <div className="car-selected">
      <div id ="car-background">
        <header>
          <h2>{car.carBrand} {car.modelName}</h2>
          <h4>{car.energySource}</h4>
        </header>
        <img
          src={carImage}
          alt={`${car.carBrand} ${car.modelName}`}
          className="car-image"
        />
        <footer><h3>{car.provider.companyName}</h3></footer>
      </div>
      <section className="car-details">
        <div className="car-info">
          <figure id='car-info-figure'>
            <Car id='logo' size={30} color="#252422" weight="fill" />
            <h3>Car Brand  |  {car.carBrand}</h3>
          </figure>
          <figure id='car-info-figure'>
            <Calendar id='logo' size={30} color="#252422" weight="fill" />
            <h3>Year  |  2003</h3>
          </figure>
          <figure id="car-info-figure">
            <Seatbelt id='logo' size={30} color="#252422" weight="fill" />
            <h3>Passengers  |   {car.passengers}</h3>
          </figure>
          <figure id='car-info-figure'>
            <PlusCircle id='logo' size={30} color="#252422" weight="fill" />
            <button
              id='extra-features-button'
              onClick={showExtraFeatures}
              aria-label={showFeatures ? "Hide extra features" : "Show extra features"}
            >
              <h3>Extra features |</h3>
              <CaretDown
                size={25}
                color="#252422"
                className={`caret-icon ${showFeatures ? 'rotated' : ''}`}
              />
            </button>
          </figure>
          {showFeatures && (
            <ul className="extra-features-list">
              {car.extraFeatures && car.extraFeatures.length > 0 ? (
                car.extraFeatures.map((feature, index) => (
                  <li key={index}>{feature.name}</li>
                ))
              ) : (
                <li>No extra features available</li>
              )}
            </ul>
          )}
        </div>
        <div className="car-rental-economics">
          <h3>Transmission Type - {car.transmission}</h3>
          <h4>Price details</h4>
          <h4>{car.pricePerDay},- kr / day - {totalPrice},- kr in total</h4>
        </div>
      </section>
      <button className='next-button' onClick={handleRentCar} aria-label="Rent this car">Rent</button>
    </div>
  );
}

/* Shows CarSelected */


export default CarSelected;