import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // adjust the import if necessary
import { NotePencil } from "@phosphor-icons/react";
import MyRentalsCarTable from './MyRentalsCarTable';
import './MyRentals.css';
import '../../App.css';

const MyRentalsCarDisplay = ({ car }) => {
  const [tableVisibility, setTableVisibility] = useState(false);
  const [rentals, setRental] = useState(null);

  const toggleDetails = () => {
    setTableVisibility(prev => !prev);
  };

  useEffect(() => {
    async function fetchCar() {
      try {
        const response = await fetch(`http://localhost:8080/rentals`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
        });
        if (!response.ok) {
          console.error('Failed to fetch car:', response.statusText);
          return;
        }
        const data = await response.json();
        setRental(data);
        console.log('Fetched rental:', data);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    }
    fetchCar();
  }
  , [car.id]);

  // Render a loading state until car data is ready.
  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-rentals-car-display">
      <button className="rentals-car-display-card" onClick={toggleDetails}>
        <div className='car-background'>
          <img src={car.image} alt={car.name} className="car-image" />
        </div>
        <section className="car-display-info">
          <div className="car-details">
            <h3>{car.carBrand} {car.modelName} ~ {car.plateNumber}</h3>
            <p>Car type: {car.carType}</p>
            <p>Year: {car.productionYear}</p>
            <p>Fuel: {car.energySource}</p>
            <p>Transmission: {car.automatic ? "Automatic" : "Manual"}</p>
            <p>Passengers: {car.passengers}</p>
            <p>Location: {car.location}</p>
            <p>Renting costs: {car.pricePerDay}kr/day</p>
          </div>
          <button
            className="edit-button"
            onClick={(e) => {
              e.stopPropagation(); // prevents toggling details when edit is clicked
              alert("Edit car details");
            }}
          >
            <NotePencil size={32} color="#000" className="edit-icon" />
          </button>
        </section>
      </button>
      {tableVisibility && <MyRentalsCarTable rentals={rentals} />}
    </div>
  );
};

export default MyRentalsCarDisplay;