import React, { useState, useEffect, useRef } from 'react';
import { getAccountId, getToken } from '../../../utils/JwtUtility'; 
import CarTypeModal from './EnumModal/CarTypeModal';
import LocationModal from './EnumModal/LocationModal';
import ExtraFeaturesModal from './EnumModal/ExtraFeaturesModal'; 
import './CreateCarModal.css';
import { set } from 'date-fns';

const CreateCarModal = ({ onClose, isCreateCarModalOpen }) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setShowErrorMessage(false);
    setErrorMessage("");
  }, [isCreateCarModalOpen]);

  const [selectedCarType, setSelectedCarType] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [isExtraFeaturesModalOpen, setIsExtraFeaturesModalOpen] = useState(false);
  const [isCarTypeModalOpen, setIsCarTypeModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [carBrand, setCarBrand] = useState('');
  const [modelName, setModelName] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [productionYear, setProductionYear] = useState('');
  const [passengers, setPassengers] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');
  const toggleCarTypeModal = () => {
    setIsCarTypeModalOpen(!isCarTypeModalOpen);
  };
  const toggleLocationModal = () => {
    setIsLocationModalOpen(!isLocationModalOpen);
  };
  const toggleExtraFeaturesModal = () => {
    setIsExtraFeaturesModalOpen(!isExtraFeaturesModalOpen);
  };

  const retrieveCarDetails = () => {
    try {
      return {
        providerId: getAccountId(),
        plateNumber: document.getElementById('plate-number').value,
        carBrand: document.getElementById('car-brand').value,
        modelName: document.getElementById('model-name').value,
        carType: selectedCarType,
        pricePerDay: document.getElementById('price-per-day').value,
        productionYear: document.getElementById('production-year').value,
        passengers: document.getElementById('passengers').value,
        transmission: document.querySelector('.create-car-button-wrapper .selectedTransmission')?.id.toUpperCase(),
        energySource: document.querySelector('.create-car-button-wrapper .selectedFuel')?.id.toUpperCase(),
        location: selectedLocation,
        extraFeatureIds: selectedFeatures,
      };
    } catch (error) {
      console.error('Error retrieving car details:', error);
      return null; 
    }
  };

  async function createCar(event) {
    event.preventDefault();
  
    const carDetails = retrieveCarDetails();

    if (!carDetails) {
      console.error('Failed to retrieve car details. Please check the form inputs.');
      setErrorMessage("Failed to retrieve car details. Please check the form inputs.");
      setShowErrorMessage(true);
      return;
    }

    console.log('Car Details being sent:', carDetails);
  
    try {
      const response = await fetch('https://norwegian-rental.online/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`,
        },
        body: JSON.stringify(carDetails),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Car created successfully:', responseData);
        onClose(); 
      } else if (response.status === 400) {
        const errorData = await response.json();
        console.error('Bad Request:', errorData.message);
        setErrorMessage("Bad Request: " + errorData.message);
      } else if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token.');
        setErrorMessage("Unauthorized: Invalid or expired token.");
      } else if (response.status === 403) {
        console.error('Apologies, you do not have permission to create a car.');
        setErrorMessage("Apologies, you do not have permission to create a car.");
      } else {
        console.error('Failed to create car:', response.statusText);
        setErrorMessage("Failed to create car. Please try again.");
      }
    } catch (error) {
      console.error('Error creating car:', error);
      setErrorMessage("An error occurred while creating the car. Please try again.");
    } finally {
      setShowErrorMessage(true);
    }
  };

  const handleSelectFuel = (e) => {
    const selectedFuel = e.target.id;
    const fuelButtons = document.querySelectorAll('.create-car-button-wrapper button');
    fuelButtons.forEach((button) => {
      if (button.id === selectedFuel) {
        setSelectedFuel(selectedFuel.toUpperCase());
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
        setSelectedTransmission(selectedTransmission.toUpperCase());
        button.classList.add('selectedTransmission');
      } else {
        button.classList.remove('selectedTransmission');
      }
    });
  };

  return (
    <div className={`create-car-modal ${isCreateCarModalOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose} aria-label="Close modal" tabIndex={0} role="button">
          <h3>&times;</h3>
        </span>
        <h2>Create Car</h2>
        <form id="create-car-form" onSubmit={createCar}>
          <input type="text" value={plateNumber} onChange={e => setPlateNumber(e.target.value)} id="plate-number" placeholder="Plate Number" required />
          <input type="text" value={carBrand} onChange={e => setCarBrand(e.target.value)} id="car-brand" placeholder="Car Brand" required />
          <input type="text" value={modelName} onChange={e => setModelName(e.target.value)} id="model-name" placeholder="Model Name" required />
          <input type="number" value={pricePerDay} onChange={e => setPricePerDay(e.target.value)} id="price-per-day" placeholder="Price Per Day" required />
          <input type="number" value={productionYear} onChange={e => setProductionYear(e.target.value)} id="production-year" placeholder="Production Year" required />
          <input type="number" value={passengers} onChange={e => setPassengers(e.target.value)} id="passengers" placeholder="Number of Passengers" required />

          <section id="select-car-type-location-container">
            <div className="enum-text-container">
              <button
                type="button"
                id="enum-button"
                onClick={toggleLocationModal}
                aria-label="Select Location"
              >
                Select Location
              </button>
              <p>{selectedLocation}</p>
            </div>
            <div className="enum-text-container">
              <button
                type="button"
                id="enum-button"
                onClick={toggleCarTypeModal}
                aria-label="Select Car Type"
              >
                Select Car Type
              </button>
              <p>{selectedCarType}</p>
            </div>
          </section>
          <button
            id='add-extra-feature-button'
            type="button"
            onClick={toggleExtraFeaturesModal}
            aria-label="Add Extra Features"
          >
            Add Extra Features
          </button>
          {isCarTypeModalOpen && (
            <CarTypeModal
              toggleModal={toggleCarTypeModal}
              isCreateCarModalOpen={isCreateCarModalOpen}
              setSelectedCarType={setSelectedCarType}
              selectedCarType={selectedCarType}
            />
          )}
          {isLocationModalOpen && (
            <LocationModal
              toggleModal={toggleLocationModal}
              isCreateCarModalOpen={isCreateCarModalOpen}
              setSelectedLocation={setSelectedLocation}
              selectedLocation={selectedLocation}
            />
          )}
          {isExtraFeaturesModalOpen && (
            <ExtraFeaturesModal 
              toggleModal={toggleExtraFeaturesModal} 
              isCreateCarModalOpen={isCreateCarModalOpen} 
              setSelectedFeatures={setSelectedFeatures} 
              selectedFeatures={selectedFeatures}
            />
          )}

          <section className="create-car-button-wrapper">
            <button id="gas" type="button" onClick={handleSelectFuel} aria-label="Select Gas Fuel">Gas</button>
            <button id="diesel" type="button" onClick={handleSelectFuel} aria-label="Select Diesel Fuel">Diesel</button>
            <button id="hybrid" type="button" onClick={handleSelectFuel} aria-label="Select Hybrid Fuel">Hybrid</button>
            <button id="electric" type="button" onClick={handleSelectFuel} aria-label="Select Electric Fuel">Electric</button>
          </section>

          <section className="create-car-button-wrapper">
            <button id="automatic" type="button" onClick={handleSelectTransmission} aria-label="Select Automatic Transmission">Automatic</button>
            <button id="manual" type="button" onClick={handleSelectTransmission} aria-label="Select Manual Transmission">Manual</button>
          </section>

          {showErrorMessage && (
            <p className="error-message" id="register-error-message">
              {errorMessage}
            </p>
          )}

          <button type="submit" aria-label="Create Car">Create Car</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCarModal;