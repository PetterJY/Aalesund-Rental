import React, { useState, useEffect, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Upload } from '@phosphor-icons/react';
import './CreateCarModal.css';
import '../../../App.css';

const CreateCarModal = ({ onClose, isCreateCarModalOpen }) => {
  const [extraFeatures, setExtraFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

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
      providerId: jwtDecode(localStorage.getItem('jwt')).id,
      plateNumber: document.getElementById('plate-number').value,
      carBrand: document.getElementById('car-brand').value,
      modelName: document.getElementById('model-name').value,
      carType: document.getElementById('car-type').value,
      pricePerDay: document.getElementById('price-per-day').value,
      productionYear: document.getElementById('production-year').value,
      passengers: document.getElementById('passengers').value,
      transmission: document.querySelector('.create-car-button-wrapper .selectedTransmission')?.id.toUpperCase(),
      energySource: document.querySelector('.create-car-button-wrapper .selectedFuel')?.id.toUpperCase(),
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const carDetails = retrieveCarDetails();
  
    try {
      const response = await fetch('http://localhost:8080/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify(carDetails),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Car created successfully:', responseData);
        onClose(); 
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error('Validation error:', errorData.message);
      } else if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token.');
      } else {
        console.error('Failed to create car:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating car:', error);
      alert('An unexpected error occurred. Please try again later.');
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
  };

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
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); 
    }
  };

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

          <section className="create-car-button-wrapper">
            <button id="gas" type="button" onClick={handleSelectFuel}>Gas</button>
            <button id="diesel" type="button" onClick={handleSelectFuel}>Diesel</button>
            <button id="hybrid" type="button" onClick={handleSelectFuel}>Hybrid</button>
            <button id="electric" type="button" onClick={handleSelectFuel}>Electric</button>
          </section>
          <section className="create-car-button-wrapper">
            <button id="automatic" type="button" onClick={handleSelectTransmission}>Automatic</button>
            <button id="manual" type="button" onClick={handleSelectTransmission}>Manual</button>
          </section>

          <button
            id="car-image"
            type="button"
            className="upload-button"
            onClick={handleImageUploadClick}
          >
            <Upload size={32} weight="bold" />
            Upload Image
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
          {selectedImage && <p>Selected Image: {selectedImage.name}</p>}

          <button type="submit">Create Car</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCarModal;