import React, { useEffect } from 'react';
import { Warehouse, XCircle} from "@phosphor-icons/react";
import { mapCarImage } from '../../../utils/CarImageMapper';
import './OrdersCarDisplay.css';
import { tr } from 'date-fns/locale';

const OrdersCarDisplay = ({rental}) => {
	const startDate = new Date(rental.startDate);
	const endDate = new Date(rental.endDate);
	const rentingTime = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

	const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
	const formattedStartDate = startDate.toLocaleDateString(undefined, options);
	const formattedEndDate = endDate.toLocaleDateString(undefined, options);
	const dailyPrice = rental.totalCost / rentingTime;

	const carImage = mapCarImage(rental.car.carBrand, rental.car.modelName);

	const [status, setStatus] = React.useState(rental.status);

	function fetchRentalDetails() {
		const json = {
			renterId: rental.renter.id,
			providerId: rental.provider.id,
			carId: rental.car.id,
			startDate: rental.startDate,
			endDate: rental.endDate,
			pickupLocation: rental.pickupLocation,
			dropoffLocation: rental.dropoffLocation,
			totalCost: rental.totalCost,
			status: rental.status,
		}
		console.log('Fetching details for PUT request:', json);
		return json;
	}

	async function cancelOrder() {
		const response = await fetch(`http://localhost:8080/rentals/${rental.rentalId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			},
			body: JSON.stringify({
				...fetchRentalDetails(),
				status: 'CANCELLED',
			}),
		});
		if (!response.ok) {
			console.error('Failed to cancel order:', response.statusText);
			return;
		}
		const data = await response.json();
		setStatus(data.status);
		console.log('Order cancelled successfully:', data);
	}

	const handleCancelOrder = () => {
		try {
			if (rental) {
				cancelOrder(rental);
			} else {
				console.error('No rental details found for cancellation.');
			}
		}
		catch (error) {
			console.error('Error fetching rental details:', error);
		}
	}

  return (
    <div className="orders-car-display-card">
      <div className='car-background'>
				<img 
					src={carImage}
					alt={`${rental.car.carBrand} ${rental.car.modelName}`}
					className="car-image" 
				/>
				<h3 id='provider-name'>{rental.provider.companyName}</h3>
      </div>
      <div className="car-details">
        <h3>{rental.car.carBrand} {rental.car.modelName}</h3>
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
							<p>{rental.pickupLocation}</p>
							<p className="pickup-time">{formattedStartDate}</p>
						</div>
						<div className="dropoff-info">
							<p className="dropoff">Dropoff</p>
							<p>{rental.dropoffLocation}</p>
							<p className="dropoff-time">{formattedEndDate}</p>
						</div>
					</div>
				</section>
        <p><b>Renting costs: {dailyPrice}kr/day</b></p>
        <p><b>Total: {rental.totalCost}kr</b></p>
      </div>
			<div className="order-status-container">
				<button className="cancel-order" onClick={handleCancelOrder}> <XCircle size={18} color="white" weight="fill" />
					<p>Cancel Order</p>
				</button>
				<p>{status}</p>
			</div>
    </div>
  );
};

export default OrdersCarDisplay;