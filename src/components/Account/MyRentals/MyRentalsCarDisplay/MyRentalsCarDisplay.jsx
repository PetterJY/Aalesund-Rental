import React, { useState, useEffect, useRef } from 'react';
import { NotePencil } from "@phosphor-icons/react";
import { mapCarImage } from '../../../utils/CarImageMapper';
import MyRentalsCarTable from '../MyRentalsCarTable/MyRentalsCarTable';
import { getAccountId } from '../../../utils/JwtUtility';
import './MyRentalsCarDisplay.css';
import '../../../App.css';

const MyRentalsCarDisplay = ({ car }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [displayCar, setDisplayCar] = useState(car);
  const [editedCar, setEditedCar] = useState(car);

  const [rentalDetails, setRentalDetails] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [tableVisibility, setTableVisibility] = useState(false);
  const toggleDetails = () => {
    setTableVisibility(prev => !prev);
  };

  const abortControllerRef = useRef(null);

  useEffect(() => {
    async function fetchRentalDetails() {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      const signal = abortController.signal;

      setIsLoading(true);
      try {
        const searchParams = new URLSearchParams();

        searchParams.append("providerId", getAccountId())
        searchParams.append("carId", car.id);

        console.log("Request URL: ", `http://localhost:8080/rentals/my-rentals?${searchParams.toString()}`);
        const response = await fetch(`http://localhost:8080/rentals/my-rentals?${searchParams.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          signal,
        });
        if (!response.ok) {
          const errorDetails = await response.text();
          console.error("Failed to fetch car data:", response.status, errorDetails);
          return;
        }
        const rentalDetails = await response.json();
        setRentalDetails(rentalDetails);

        console.log('Fetched rental:', rentalDetails);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted:', error.message);
        } else {
          console.error('Error fetching rental:', error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchRentalDetails();

    return () => {
      // Cleanup function to abort the fetch request if the component unmounts
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
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

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this car?");
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://localhost:8080/cars/${car.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
      });
  
      if (!response.ok) {
        console.error('Failed to delete car:', response.statusText);
        return;
      }
      if (response.status === 204) {
        console.log('Car deleted successfully');
        //Gives a message to the user that the car was deleted successfully
        alert('Car deleted successfully!');
      }
  
      console.log('Car deleted successfully');
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCar(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const carImage = mapCarImage(editedCar.carBrand, editedCar.modelName);

  return (
    <div className="my-rentals-car-display">
      <button className="rentals-car-display-card" onClick={toggleDetails}>
        <div className="car-background">
          <img 
          src={carImage}
          alt={`${displayCar.carBrand} ${displayCar.modelName}`}
          className="car-image" 
          />
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
                <button onClick={handleDelete}>Delete</button>
              </div>
            ) : (
              <button className="edit-button" onClick={handleEditClick}>
                <NotePencil size={32} color="#000" className="edit-icon" />
              </button>
            )}
          </div>
        </section>
      </button>
      {tableVisibility && (
        isLoading ? (
          <div>Loading rentals...</div> 
        ) : (
          <MyRentalsCarTable rentals={rentalDetails} /> 
        )
      )}
    </div>
  );
};

export default MyRentalsCarDisplay;