import React, { useState, useEffect } from 'react';
import { getAccountId } from '../../utils/JwtUtility'; 
import OrdersCarDisplay from './OrdersCarDisplay/OrdersCarDisplay'; 
import AccountHeader from '../AccountHeader/AccountHeader';
import carImage from '../../../resources/images/car.png';
import '../Orders/Orders.css';
import '../../App.css';

const Orders = ({ orders = [] }) => { 
  const [rentals, setRentals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

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

  return (
    <div className="orders">
      <AccountHeader />
      <section className="orders-section">
        <div className="orders-list">
        <h2 className="title">My Bookings</h2>
        {rentals.map((rental) => (
            <OrdersCarDisplay
              key={rental.rentalId}
              rental={rental}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Orders;