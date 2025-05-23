import React, { useState, useEffect, useRef } from 'react';
import { getAccountId, getToken, makeApiRequest } from '../../../utils/JwtUtility'; 
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
    // Check if required enums are selected
    if (!selectedFuel || !selectedTransmission || !selectedCarType || !selectedLocation) {
      setErrorMessage("Please select all required options: fuel type, transmission, car type, and location");
      return null;
    }

    if (productionYear < 1886 || productionYear > new Date().getFullYear()) {
      setErrorMessage("Please enter a valid production year.");
      alert("Please enter a valid production year.");
      return null;
    }

    if (plateNumber.length < 5 || plateNumber.length > 11) {
      setErrorMessage("Plate number must be between 5 and 11 characters.");
      alert("Plate number must be between 5 and 11 characters.");
      return null;
    }

    if (carBrand.length < 1 || carBrand.length > 50) {
      setErrorMessage("Car brand must be between 1 and 50 characters.");
      alert("Car brand must be between 1 and 50 characters.");
      return null;
    }

    if (modelName.length < 1 || modelName.length > 50) {
      setErrorMessage("Model name must be between 1 and 50 characters.");
      alert("Model name must be between 1 and 50 characters.");
      return null;
    }

    if (pricePerDay <= 0) {
      setErrorMessage("Price per day must be a positive number");
      alert("Price per day must be a positive number");
      return null;
    }

    if (passengers <= 0 || passengers > 24) {
      setErrorMessage("Number of passengers must be a positive number and less than 25");
      alert("Number of passengers must be a positive number and less than 25");
      return null;
    }

    return {
      providerId: getAccountId(),
      plateNumber: plateNumber,
      carBrand: carBrand,
      modelName: modelName,
      pricePerDay: Number(pricePerDay),
      productionYear: Number(productionYear),
      passengers: Number(passengers),
      carType: selectedCarType,
      transmission: selectedTransmission,
      energySource: selectedFuel,
      location: selectedLocation,
      extraFeatureIds: selectedFeatures.length > 0 ? selectedFeatures : []
    };
  } catch (error) {
    return null;
  }
};

  async function createCar(event) {
    event.preventDefault();
  
    const carDetails = retrieveCarDetails();
    
    if (!carDetails) {
      setShowErrorMessage(true);
      return; 
    }
  
    try {
      await makeApiRequest('https://norwegian-rental.online/api/cars', {
        body: JSON.stringify(carDetails),
      });

      onClose(); 
    } catch (error) {
      if (error.message && error.message.includes("400")) {
        setErrorMessage("Bad Request: Please check your input data.");
      } else if (error.message && error.message.includes("401")) {
        setErrorMessage("Unauthorized: Invalid or expired token.");
      } else if (error.message && error.message.includes("403")) {
        setErrorMessage("Apologies, you do not have permission to create a car.");
      } else {
        setErrorMessage("An error occurred while creating the car. Please try again.");
      }
      
      setShowErrorMessage(true);
    }
  }

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
  <dialog 
    className="create-car-modal"
    open={isCreateCarModalOpen}
    aria-labelledby="create-car-title"
    aria-modal="true"
  >
    <div className="modal-content">
      <button 
        className="close" 
        onClick={onClose} 
        aria-label="Close modal"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      
      <h2 id="create-car-title">Create Car</h2>
      
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
              aria-haspopup="dialog"
            >
              Select Location
            </button>
            <p id="selected-location" aria-live="polite">{selectedLocation}</p>
          </div>
          
          <div className="enum-text-container">
            <button
              type="button"
              id="enum-button"
              onClick={toggleCarTypeModal}
              aria-label="Select Car Type"
              aria-haspopup="dialog"
            >
              Select Car Type
            </button>
            <p id="selected-car-type" aria-live="polite">{selectedCarType}</p>
          </div>
        </section>
        
        <button
          id="add-extra-feature-button"
          type="button"
          onClick={toggleExtraFeaturesModal}
          aria-label="Add Extra Features"
          aria-haspopup="dialog"
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

        <fieldset className="create-car-button-wrapper">
          <legend className="visually-hidden">Fuel Type</legend>
          <button id="gas" type="button" onClick={handleSelectFuel} aria-pressed={selectedFuel === "GAS"} aria-label="Select Gas Fuel">Gas</button>
          <button id="diesel" type="button" onClick={handleSelectFuel} aria-pressed={selectedFuel === "DIESEL"} aria-label="Select Diesel Fuel">Diesel</button>
          <button id="hybrid" type="button" onClick={handleSelectFuel} aria-pressed={selectedFuel === "HYBRID"} aria-label="Select Hybrid Fuel">Hybrid</button>
          <button id="electric" type="button" onClick={handleSelectFuel} aria-pressed={selectedFuel === "ELECTRIC"} aria-label="Select Electric Fuel">Electric</button>
        </fieldset>

        <fieldset className="create-car-button-wrapper">
          <legend className="visually-hidden">Transmission Type</legend>
          <button id="automatic" type="button" onClick={handleSelectTransmission} aria-pressed={selectedTransmission === "AUTOMATIC"} aria-label="Select Automatic Transmission">Automatic</button>
          <button id="manual" type="button" onClick={handleSelectTransmission} aria-pressed={selectedTransmission === "MANUAL"} aria-label="Select Manual Transmission">Manual</button>
        </fieldset>
        <button type="submit" aria-label="Create Car">Create Car</button>
      </form>
    </div>
  </dialog>
  );
};

export default CreateCarModal;