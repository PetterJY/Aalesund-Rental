import React, { useState, useEffect } from 'react';
import './CreateCarModal.css';
import '../../../App.css';

const CreateCarModal = ({ onClose, isCreateCarModalOpen }) => {
  const [extraFeatures, setExtraFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    if (isCreateCarModalOpen) {
      async function fetchExtraFeatures() {
        try {
          const response = await fetch('http://localhost:8080/extra-features', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            },
          });
          if (!response.ok) {
            console.error('Failed to fetch extra features:', response.statusText);
            return;
          }
          const data = await response.json();
          setExtraFeatures(data); // Store the fetched features
        } catch (error) {
          console.error('Error fetching extra features:', error);
        }
      }
      fetchExtraFeatures();
    }
  }, [isCreateCarModalOpen]);

  const handleFeatureSelection = (featureId) => {
    setSelectedFeatures((prevSelected) =>
      prevSelected.includes(featureId)
        ? prevSelected.filter((id) => id !== featureId) // Remove if already selected
        : [...prevSelected, featureId] // Add if not selected
    );
  };
  
  const retrieveCarDetails = () => {
    return {
      plateNumber: document.getElementById('plate-number').value,
      carBrand: document.getElementById('car-brand').value,
      modelName: document.getElementById('model-name').value,
      carType: document.getElementById('car-type').value,
      pricePerDay: document.getElementById('price-per-day').value,
      productionYear: document.getElementById('production-year').value,
      passengers: document.getElementById('passengers').value,
      fuelType: document.querySelector('.create-car-button-wrapper .selectedFuel')?.id,
      transmissionType: document.querySelector('.create-car-button-wrapper .selectedTransmission')?.id,
      providerId: localStorage.getItem('userId'), 
      extraFeatureIds: selectedFeatures, 
      carImage: document.getElementById('car-image').value
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carDetails = retrieveCarDetails();

    try {
      const response = await fetch('http://localhost:8080/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(carDetails)
      });
      if (!response.ok) {
        console.error('Failed to create car:', response.statusText);
        return;
      }
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  const handleSelectFuel = (e) => {
    const selectedFuel = e.target.id;
    const fuelButtons = document.querySelectorAll('.create-car-button-wrapper button');
    fuelButtons.forEach((button) => {
      if (button.id === selectedFuel) {
        button.classList.add('selectedFuel');
      } else {
        button.classList.remove('selectedFuel');
      }
    });
  }

  const handleSelectTransmission = (e) => {
    const selectedTransmission = e.target.id;
    const transmissionButtons = document.querySelectorAll('.create-car-button-wrapper button');
    transmissionButtons.forEach((button) => {
      if (button.id === selectedTransmission) {
        button.classList.add('selectedTransmission');
      } else {
        button.classList.remove('selectedTransmission');
      }
    });
  }

  return (
    <div className={`create-car-modal ${isCreateCarModalOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create Car</h2>
        <form id="create-car-form" onSubmit={handleSubmit}>
          <input type="text" id="plate-number" placeholder="Plate Number" required />
          <input type="text" id="car-brand" placeholder="Car Brand" required />
          <input type="text" id="model-name" placeholder="Model Name" required />
          <input type="text" id="car-type" placeholder="Car Type" required />
          <input type="number" id="price-per-day" placeholder="Price Per Day" required />
          <input type="number" id="production-year" placeholder="Production Year" required />
          <input type="number" id="passengers" placeholder="Number of Passengers" required />
          <section className='create-car-button-wrapper'>
            <button id='gas' type='button' onClick={handleSelectFuel}>Gas</button>
            <button id='diesel' type='button' onClick={handleSelectFuel}>Diesel</button>
            <button id='hybrid' type='button' onClick={handleSelectFuel}>Hybrid</button>
            <button id='electric' type='button' onClick={handleSelectFuel}>Electric</button>
          </section>
          <section className='create-car-button-wrapper'>
            <button id='automatic-transmission' type='button' onClick={handleSelectTransmission}>Automatic</button> 
            <button id='manual-transmission' type='button' onClick={handleSelectTransmission}>Manual</button>
          </section>
          
          <button type="submit">Create Car</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCarModal;