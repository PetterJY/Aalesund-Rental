import React, { useState, useEffect } from 'react';
import { NotePencil } from "@phosphor-icons/react";
import MyRentalsCarTable from './MyRentalsCarTable';
import './MyRentalsCarDisplay.css';
import '../../App.css';

const MyRentalsCarDisplay = ({ car }) => {
  const [tableVisibility, setTableVisibility] = useState(false);
  const [rentals, setRental] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // local state to show updated values on the card
  const [displayCar, setDisplayCar] = useState(car);
  const [editedCar, setEditedCar] = useState(car);

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
          console.error('Failed to fetch rentals:', response.statusText);
          return;
        }
        const carData = await response.json();
        setRental(carData);
        console.log('Fetched rental:', carData);
      } catch (error) {
        console.error('Error fetching rental:', error);
      }
    }
    fetchCar();
  }, [car.id]);

  // When car prop changes, update both local display and edited state
  useEffect(() => {
    setDisplayCar(car);
    setEditedCar(car);
  }, [car]);

  const handleEditClick = e => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    async function updateCar() {
      try {
        const response = await fetch(`http://localhost:8080/cars/${car.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          body: JSON.stringify(editedCar)
        });
        if (!response.ok) {
          console.error('Failed to update car:', response.statusText);
          return;
        }
        const data = await response.json();
        console.log('Updated car:', data);
        // Update the displayed car details with updated data
        setDisplayCar(data);
      } catch (error) {
        console.error('Error updating car:', error);
      }
    }
    updateCar();
    setIsEditing(false);
  };

  const handleDiscard = () => {
    // Reset the edits to original displayed car details
    setEditedCar(displayCar);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCar(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Render a loading state until car data is available
  if (!displayCar) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-rentals-car-display">
      <button className="rentals-car-display-card" onClick={toggleDetails}>
        <div className="car-background">
          <img src={displayCar.image} alt={displayCar.name} className="car-image" />
        </div>
        <section className="car-display-info">
          <div className="car-details">
            <h3>
              {isEditing ? (
                <>
                  <input 
                    placeholder="Brand name"
                    type="text" 
                    name="carBrand" 
                    value={editedCar.carBrand} 
                    onChange={handleChange} 
                  />{" "}
                  <input 
                    placeholder="Model name"
                    type="text" 
                    name="modelName" 
                    value={editedCar.modelName} 
                    onChange={handleChange} 
                  />{" "}
                  ~{" "}
                  <input 
                    placeholder="Plate number"
                    type="text" 
                    name="plateNumber" 
                    value={editedCar.plateNumber} 
                    onChange={handleChange} 
                  />
                </>
              ) : (
                `${displayCar.carBrand} ${displayCar.modelName} ~ ${displayCar.plateNumber}`
              )}
            </h3>
            <p>
              Car type:{" "}
              {isEditing ? (
                <input 
                  type="text" 
                  name="carType" 
                  value={editedCar.carType} 
                  onChange={handleChange} 
                />
              ) : (
                displayCar.carType
              )}
            </p>
            <p>
              Year:{" "}
              {isEditing ? (
                <input 
                  type="number" 
                  name="productionYear" 
                  value={editedCar.productionYear} 
                  onChange={handleChange} 
                />
              ) : (
                displayCar.productionYear
              )}
            </p>
            <p>
              Fuel:{" "}
              {isEditing ? (
                <input 
                  type="text" 
                  name="energySource" 
                  value={editedCar.energySource} 
                  onChange={handleChange} 
                />
              ) : (
                displayCar.energySource
              )}
            </p>
            <p>
              Transmission:{" "}
              {isEditing ? (
                <select 
                  name="automatic" 
                  value={editedCar.automatic ? "Automatic" : "Manual"} 
                  onChange={handleChange}
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              ) : (
                displayCar.automatic ? "Automatic" : "Manual"
              )}
            </p>
            <p>
              Passengers:{" "}
              {isEditing ? (
                <input 
                  type="number" 
                  name="passengers" 
                  value={editedCar.passengers} 
                  onChange={handleChange} 
                />
              ) : (
                displayCar.passengers
              )}
            </p>
            <p>
              Location:{" "}
              {isEditing ? (
                <input 
                  type="text" 
                  name="location" 
                  value={editedCar.location} 
                  onChange={handleChange} 
                />
              ) : (
                displayCar.location
              )}
            </p>
            <p>
              Renting costs:{" "}
              {isEditing ? (
                <input 
                  type="number" 
                  name="pricePerDay" 
                  value={editedCar.pricePerDay} 
                  onChange={handleChange} 
                />
              ) : (
                `${displayCar.pricePerDay}kr/day`
              )}
            </p>
          </div>
          <div className="my-rental-buttons">
            {isEditing ? (
              <div className="save-discard-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleDiscard}>Discard</button>
              </div>
            ) : (
              <button className="edit-button" onClick={handleEditClick}>
                <NotePencil size={32} color="#000" className="edit-icon" />
              </button>
            )}
          </div>
        </section>
      </button>
      {tableVisibility && <MyRentalsCarTable rentals={rentals} />}
    </div>
  );
};

export default MyRentalsCarDisplay;