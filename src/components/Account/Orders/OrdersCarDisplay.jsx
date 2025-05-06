import React from 'react';
import '../../App.css';
import '../Orders/OrdersCarDisplay.css';
import { Warehouse} from "@phosphor-icons/react";


const OrdersCarDisplay = (car) => {
  return (
    <div className="orders-car-display-card">
      <div className='car-background'>
				<img src={car.image} alt={car.name} className="car-image" />
				<h3 id='provider-name'>Ørsta Kommune</h3>
      </div>
      <div className="car-details">
        <h3>{car.brand} {car.model}</h3>
        <p>{car.rentingTime} days renting</p>
        <section className="rental-schedule-container">
					<div className="rental-schedule-logos">
              <Warehouse size={32} className="pickup-logo" color="#000000" weight="fill" />
							<div className="vertical-line"></div>
							<Warehouse size={32} className="pickup-logo" color="#000000" weight="fill" />
					</div>
					<div className="rental-schedule-text">
						<div className="pickup-info">
							<p className="pickup">Pickup</p>
							<p>{car.pickUpLocation}</p>
							<p className="pickup-time">{car.pickUpTime}</p>
						</div>
						<div className="dropoff-info">
							<p className="dropoff">Dropoff</p>
							<p>{car.dropOffLocation}</p>
							<p className="dropoff-time">{car.dropOffTime}</p>
						</div>
					</div>
				</section>
        <p>Renting costs: {car.pricePerDay}kr/day</p>
        <p>Total: {car.priceTotal}kr</p>
      </div>
    </div>
  );
};

export default OrdersCarDisplay;