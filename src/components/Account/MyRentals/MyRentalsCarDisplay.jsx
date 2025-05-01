import React from 'react';
import { Warehouse} from "@phosphor-icons/react";
import '../Account.css';
import '../../App.css';


const MyRentalsCarDisplay = (car) => {
  return (
    <div className="car-display-card">
      <div className='car-background'>
        <img src={car.image} alt={car.name} className="car-image" />
      </div>
      <div className="car-details">
        <h3>{car.brand} {car.model}</h3>
        <p>{car.rentingTime} days renting</p>
        <section class="rental-schedule-container">
					<div class="rental-schedule-logos">
              <Warehouse size={32} class="pickup-logo" color="#000000" weight="fill" />
							<div className="vertical-line"></div>
							<Warehouse size={32} class="pickup-logo" color="#000000" weight="fill" />
					</div>
					<div class="rental-schedule-text">
						<div class="pickup-info">
							<p class="pickup">Pickup</p>
							<p>{car.pickUpLocation}</p>
							<p class="pickup-time">{car.pickUpTime}</p>
						</div>
						<div class="dropoff-info">
							<p class="dropoff">Dropoff</p>
							<p>{car.dropOffLocation}</p>
							<p class="dropoff-time">{car.dropOffTime}</p>
						</div>
					</div>
				</section>
        <p>Renting costs: {car.pricePerDay}kr/day</p>
        <p>Total: {car.priceTotal}kr</p>
      </div>
    </div>
  );
};

export default MyRentalsCarDisplay;