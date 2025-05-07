import React from 'react';
import { Warehouse} from "@phosphor-icons/react";
import { getCarImage } from '../../../utils/CarImageMapper';
import './OrdersCarDisplay.css';
import '../../../App.css';

const OrdersCarDisplay = (rental) => {
	const startDate = new Date(rental.pickUpTime);
	const endDate = new Date(rental.dropOffTime);
	const rentingTime = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

	// Format dates in a user-friendly way
	const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
	const formattedStartDate = startDate.toLocaleDateString(undefined, options);
	const formattedEndDate = endDate.toLocaleDateString(undefined, options);
	const dailyPrice = rental.priceTotal / rentingTime;

	const carImage = getCarImage(rental.brand, rental.model);

  return (
    <div className="orders-car-display-card">
      <div className='car-background'>
			<img 
          src={carImage}
          alt={`${rental.brand} ${rental.model}`}
          className="car-image" 
          />
				<h3 id='provider-name'>{rental.provider}</h3>
      </div>
      <div className="car-details">
        <h3>{rental.brand} {rental.model}</h3>
        <p>{rentingTime} days renting</p>
        <section className="rental-schedule-container">
					<div className="rental-schedule-logos">
              <Warehouse size={32} className="pickup-logo" color="#000000" weight="fill" />
							<div className="vertical-line"></div>
							<Warehouse size={32} className="pickup-logo" color="#000000" weight="fill" />
					</div>
					<div className="rental-schedule-text">
						<div className="pickup-info">
							<p className="pickup">Pickup</p>
							<p>{rental.pickUpLocation}</p>
							<p className="pickup-time">{formattedStartDate}</p>
						</div>
						<div className="dropoff-info">
							<p className="dropoff">Dropoff</p>
							<p>{rental.dropOffLocation}</p>
							<p className="dropoff-time">{formattedEndDate}</p>
						</div>
					</div>
				</section>
        <p><b>Renting costs: {dailyPrice}kr/day</b></p>
        <p><b>Total: {rental.priceTotal}kr</b></p>
      </div>
    </div>
  );
};

export default OrdersCarDisplay;