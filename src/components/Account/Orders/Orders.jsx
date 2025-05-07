import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import OrdersCarDisplay from './OrdersCarDisplay/OrdersCarDisplay'; 
import AccountHeader from '../AccountHeader/AccountHeader';
import carImage from '../../../resources/images/car.png';
import '../Orders/Orders.css';
import '../../App.css';

const Orders = ({ orders = [] }) => { 
  const [rentals, setRentals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
      async function fetchRentals() {
        setIsLoading(true); 
        const token = localStorage.getItem('jwt');

        if (!token) {
          console.error('No JWT token found in localStorage');
          setErrorMessage("You are not logged in. Please log in to view your bookings.");
          setShowErrorMessage(true);
          return;
        }

        const decodedToken = jwtDecode(token); 
        const id = decodedToken.id;
        
        try {
          const response = await fetch(`http://localhost:8080/rentals?userId=${id}`, {
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
          const data = await response.json();
          setRentals(data);
          console.log('Fetched rentals:', data);
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
              key={rental.id}
              provider={rental.provider.companyName}
              brand={rental.car.carBrand}
              model={rental.car.modelName}
              pickUpLocation={rental.pickupLocation}
              dropOffLocation={rental.dropoffLocation}
              pickUpTime={rental.startDate}
              dropOffTime={rental.endDate}
              priceTotal={rental.totalCost}
              image={carImage}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Orders;