import React from 'react';
import '../../global.css';
import '../Account.css';

const BookingsCarDisplay = (car) => {
  return (
    <div className="car-display-card">
      <img src={car.image} alt={car.name} className="car-image" />
      <div className="car-details">
        <h3>{car.name}</h3>
        <p>Model: {car.model}</p>
        <p>Price per day: ${car.pricePerDay}</p>
        <p>Seats: {car.seats}</p>
      </div>
    </div>
  );
};

export default BookingsCarDisplay;