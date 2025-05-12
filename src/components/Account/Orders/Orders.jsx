import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRole, getAccountId } from '../../utils/JwtUtility'; 
import OrdersCarDisplay from './OrdersCarDisplay/OrdersCarDisplay'; 
import carImage from '../../../resources/images/logo.svg';
import '../Orders/Orders.css';
import '../../App.css';

const Orders = () => { 
  const navigate = useNavigate();
  const role = getRole();
  
  useEffect(() => {
    if (role !== 'ROLE_ADMIN' && role !== 'ROLE_USER') {
      console.error('Unauthorized access to My Rentals page. Redirecting to home.');
      navigate('/home');
    }
  }, [navigate, role]);

  const [rentals, setRentals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState('All'); 

  useEffect(() => {
    async function fetchRentals() {
      setIsLoading(true); 
      try {
        const response = await fetch(`http://localhost:8080/rentals?userId=${getAccountId()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        if (!response.ok) {
          console.error('Failed to fetch rentals:', response.statusText);
          return;
        }
        const rentalDetails = await response.json();
        setRentals(rentalDetails);
        console.log('Fetched rentals:', rentalDetails);
      } catch (error) {
        console.error('Error fetching rentals:', error);
      } finally {
        setIsLoading(false);
      }
    } 
    fetchRentals();
  }, []);

  const filteredRentals = rentals.filter((rental) => {
    if (selectedStatus === 'All') return true;
    return rental.status === selectedStatus;
  });

  return (
    <div className="orders">
      <section className="orders-section">
        <div orders-header>
        <div className="orders-header">
            <h2 className="title">My Bookings - </h2> 
            <select
              name="Booking Categories"
              id="booking-select"
              value={selectedStatus} // Bind the selected value to the state
              onChange={(e) => setSelectedStatus(e.target.value)} // Update the state on change
            >
              <option value="All">All</option>
              <option value="PENDING">Pending</option>
              <option value="ACTIVE">Active</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>
          <div className="orders-list">
            {isLoading ? (
              <p>Loading...</p>
            ) : filteredRentals.length > 0 ? (
              filteredRentals.map((rental) => (
                <OrdersCarDisplay
                  key={rental.rentalId}
                  rental={rental}
                />
              ))
            ) : (
              <div className='no-matching'>
                <h3>No rentals match the selected filter.</h3>
                <img src={carImage} alt="No rentals" className="no-rentals-image" />
                <p>Try changing the filter or check back later.</p>
              </div> // Message when no rentals match the filter
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Orders;