import React, { useState, useEffect } from 'react';
import { NotePencil } from "@phosphor-icons/react";
import MyRentalsCarTable from '../MyRentalsCarTable/MyRentalsCarTable';
import './MyRentalsCarDisplay.css';

const MyRentalsCarDisplay = ({ car }) => {
  const [tableVisibility, setTableVisibility] = useState(false);
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleDetails = () => {
    setTableVisibility((prev) => !prev);
  };

  useEffect(() => {
    async function fetchRentals() {
      setIsLoading(true); 
      try {
        const response = await fetch(`http://localhost:8080/rentals?carId=${car.id}`, {
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

    if (tableVisibility) {
      fetchRentals();
    }
  }, [car.id, tableVisibility]);

  return (
    <div className="my-rentals-car-display">
      <button className="rentals-car-display-card" onClick={toggleDetails}>
        <div className="car-background">
          <img src={car.image} alt={car.name} className="car-image" />
        </div>
        <section className="car-display-info">
          <div className="car-details">
            <h3>{`${car.carBrand} ${car.modelName} ~ ${car.plateNumber}`}</h3>
          </div>
        </section>
      </button>
      {tableVisibility && (
        isLoading ? (
          <div>Loading rentals...</div> // Show loading indicator
        ) : (
          rentals && <MyRentalsCarTable rentals={rentals} /> // Render table only if rentals exist
        )
      )}
    </div>
  );
};

export default MyRentalsCarDisplay;