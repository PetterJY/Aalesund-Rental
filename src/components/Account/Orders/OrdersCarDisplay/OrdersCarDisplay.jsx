import React, { useEffect, useState } from 'react';
import { Warehouse, XCircle} from "@phosphor-icons/react";
import { mapCarImage } from '../../../utils/CarImageMapper';
import { CaretLeft } from '@phosphor-icons/react';
import './OrdersCarDisplay.css';
import { tr } from 'date-fns/locale';

const OrdersCarDisplay = ({rental}) => {
	const startDate = new Date(rental.startDate);
	const endDate = new Date(rental.endDate);
	const rentingTime = Math.round(Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)));

  const [verifyPanel, setVerifyPanel] = useState(false);
	const [status, setStatus] = React.useState(rental.status);

	const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
	const formattedStartDate = startDate.toLocaleDateString(undefined, options);
	const formattedEndDate = endDate.toLocaleDateString(undefined, options);
	const dailyPrice = rental.totalCost / rentingTime;

	const carImage = mapCarImage(rental.car.carBrand, rental.car.modelName);


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
		setVerifyPanel(false);


		const response = await fetch(`http://localhost:8080/api/rentals/${rental.rentalId}`, {
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
    if (status !== "PENDING") return;
    setVerifyPanel(true);
  }
  
  // Close the panel if ESC key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && verifyPanel) {
        setVerifyPanel(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [verifyPanel]);

  return (
  <article className="orders-car-display-card">
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
          <Warehouse size={32} className="pickup-logo" color="#000000" weight="fill" aria-hidden="true" />
          <div className="vertical-line" aria-hidden="true"></div>
          <Warehouse size={32} className="pickup-logo" color="#000000" weight="fill" aria-hidden="true" />
        </div>
        <div className="rental-schedule-text">
          <dl className="pickup-info">
            <dt className="pickup">Pickup</dt>
            <dd>{rental.pickupLocation}</dd>
            <dd className="pickup-time">
              <time dateTime={startDate.toISOString()}>{formattedStartDate}</time>
            </dd>
          </dl>
          <dl className="dropoff-info">
            <dt className="dropoff">Dropoff</dt>
            <dd>{rental.dropoffLocation}</dd>
            <dd className="dropoff-time">
              <time dateTime={endDate.toISOString()}>{formattedEndDate}</time>
            </dd>
          </dl>
        </div>
      </section>
      <dl className="price-info">
        <dt>Renting costs:</dt>
        <dd><strong>{dailyPrice}kr/day</strong></dd>
        <dt>Total:</dt>
        <dd><strong>{rental.totalCost}kr</strong></dd>
      </dl>
    </div>
    <div className="order-status-container">
      {status === "PENDING" && (
        <button
          className="cancel-order"
          onClick={handleCancelOrder}
          aria-label="Cancel order"
        >
          <XCircle size={18} color="white" weight="fill" aria-hidden="true" />
          <span>Cancel Order</span>
        </button>
      )}
      <span className='order-status-label' role="status">{status}</span>
    </div>
		      {verifyPanel && (
        <div className="verify-slide-panel">
          <div className="verify-panel-content">
            <h4>Are you sure?</h4>
            <p>You're about to cancel your booking for:</p>
            <div className="verify-car-info">
              <span className="verify-car-name">{rental.car.carBrand} {rental.car.modelName}</span>
              <span className="verify-car-dates">
                {formattedStartDate} - {formattedEndDate}
              </span>
            </div>
            <p className="verify-warning">This action cannot be undone.</p>
            
            <div className="verify-buttons">
              <button 
                className="verify-keep-btn"
                onClick={() => setVerifyPanel(false)}
              >
                <CaretLeft size={16} weight="bold" />
                Keep Reservation
              </button>
              <button 
                className="verify-cancel-btn"
                onClick={cancelOrder}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
  </article>
  );
};

export default OrdersCarDisplay;