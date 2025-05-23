import React, { useState, useEffect, useRef } from 'react';
import { NotePencil } from "@phosphor-icons/react";
import { mapCarImage } from '../../../utils/CarImageMapper';
import { getRole, makeApiRequest, getAccountId, getToken } from '../../../utils/JwtUtility';
import MyRentalsCarTable from '../MyRentalsCarTable/MyRentalsCarTable';
import ExtraFeaturesModal from '../CreateCarModal/EnumModal/ExtraFeaturesModal';
import LocationModal from '../CreateCarModal/EnumModal/LocationModal';
import CarTypeModal from '../CreateCarModal/EnumModal/CarTypeModal';
import './MyRentalsCarDisplay.css';

const MyRentalsCarDisplay = ({ car, providerId }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [displayCar, setDisplayCar] = useState(car);
  const [editedCar, setEditedCar] = useState(car);

  const [rentalDetails, setRentalDetails] = useState([]);
  const [tableVisibility, setTableVisibility] = useState(false);
  
  const [isExtraFeaturesModalOpen, setIsExtraFeaturesModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(editedCar.location);

  const [isCarTypeModalOpen, setIsCarTypeModalOpen] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState(editedCar.carType);

  const [isAvailable, setIsAvailable] = useState(editedCar.available);

  const role = getRole();

  const toggleDetails = () => {
    if (!isEditing) {
      setTableVisibility((prev) => !prev); // Only toggle if not in editing mode
    }
  };
  
  const toggleExtraFeaturesModal = () => {
    // Sync selectedFeatures with the current editedCar features before opening
    if (!isExtraFeaturesModalOpen) {
      setSelectedFeatures(
        Array.isArray(editedCar.extraFeatures)
          ? editedCar.extraFeatures.map((feature) => feature.id)
          : []
      );
    }
    setIsExtraFeaturesModalOpen((prev) => !prev);
  };

  const toggleLocationModal = () => {
    setIsLocationModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (selectedLocation && selectedLocation !== editedCar.location) {
      setEditedCar((prev) => ({
        ...prev,
        location: selectedLocation,
      }));
    }
  }, [selectedLocation]);

  const toggleCarTypeModal = () => {
    setIsCarTypeModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (selectedCarType && selectedCarType !== editedCar.carType) {
      setEditedCar((prev) => ({
        ...prev,
        carType: selectedCarType,
      }));
    }
  }, [selectedCarType]);

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
        searchParams.append("providerId", providerId || getAccountId());
        searchParams.append("carId", car.id);

        const url = `http://localhost:8080/api/rentals/my-rentals?${searchParams.toString()}`;
        // Replace fetch with makeApiRequest
        const rentalDetails = await makeApiRequest(url, { signal });
        setRentalDetails(rentalDetails);
      } catch (error) {
        if (error.name === 'AbortError') {
        } else {
          console.error('Error fetching rental:', error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchRentalDetails();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [car.id, providerId]);

  useEffect(() => {
    setDisplayCar(car);
    setEditedCar(car);
  }, [car]);

  const handleEditClick = e => {
    e.stopPropagation();
    setIsEditing(true);
  };

  function formatRentalDetails(rentalDetails) {
    const formattedDetails =  {
      providerId: rentalDetails.provider.id,
      plateNumber: rentalDetails.plateNumber,
      carBrand: rentalDetails.carBrand,
      modelName: rentalDetails.modelName,
      carType: rentalDetails.carType,
      pricePerDay: rentalDetails.pricePerDay,
      productionYear: rentalDetails.productionYear,
      passengers: rentalDetails.passengers,
      transmission: rentalDetails.transmission,
      energySource: rentalDetails.energySource,
      location: rentalDetails.location,
      extraFeatureIds: rentalDetails.extraFeatures.map(feature => feature.id),
      available: rentalDetails.available,
    }

    return formattedDetails;
  }

  const handleSave = async () => {
    try {
      const updatedCar = await makeApiRequest(`http://localhost:8080/api/cars/${car.id}`, {
        method: 'PUT',
        body: JSON.stringify(formatRentalDetails(editedCar)),
      });
      
      setDisplayCar(updatedCar);
    } catch (error) {
      console.error('Error updating car:', error);
    }
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setEditedCar(displayCar);
    setIsEditing(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      const payload = {
        ...formatRentalDetails(displayCar),
        available: !displayCar.available,
      };

      const updatedCar = await makeApiRequest(`http://localhost:8080/api/cars/${car.id}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      setDisplayCar(updatedCar);
      setEditedCar(updatedCar);
      setIsAvailable(updatedCar.available);
    } catch (error) {
      alert('Error updating availability');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCar(prev => ({
      ...prev,
      [name]: name === "automatic" ? value === "Automatic" : value
    }));
  };

  useEffect(() => {
    handleExtraFeaturesUpdate(selectedFeatures);
  }, [selectedFeatures]);

const handleExtraFeaturesUpdate = async (selectedFeatureIds) => {
  if (!Array.isArray(selectedFeatureIds)) {
    console.error('selectedFeatureIds is not an array:', selectedFeatureIds);
    selectedFeatureIds = []; 
  }

 const updatedFeatures = await Promise.all(
    selectedFeatureIds.map(async (id) => {
      const existingFeature = displayCar.extraFeatures.find((feature) => feature.id === id);
      if (existingFeature) {
        return existingFeature;
      }

      const name = await fetchFeatureName(id);
      return { id, name }; 
    })
  );
        
  setEditedCar((prev) => ({
    ...prev,
    extraFeatures: updatedFeatures,
  }));
};

  const fetchFeatureName = async (featureId) => {
    try {
      const featureData = await makeApiRequest(`http://localhost:8080/api/extra-features/${featureId}`);
      return featureData.name;
    } catch (error) {
      console.error('Error fetching feature name:', error);
      return `Unknown Feature (${featureId})`; 
    }
  };



  const carImage = mapCarImage(editedCar.carBrand, editedCar.modelName);

  return (
    <div className="my-rentals-car-display">
      <button className="rentals-car-display-card" onClick={toggleDetails} aria-label="Toggle car details">
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
                  aria-label="Car brand"
                />{' '}
                <input
                  placeholder="Model name"
                  type="text"
                  name="modelName"
                  value={editedCar.modelName}
                  onChange={handleChange}
                  aria-label="Model name"
                />{' '}
                ~{' '}
                <input
                  placeholder="Plate number"
                  type="text"
                  name="plateNumber"
                  value={editedCar.plateNumber}
                  onChange={handleChange}
                  aria-label="Plate number"
                />
              </>
            ) : (
              `${displayCar.carBrand} ${displayCar.modelName} ~ ${displayCar.plateNumber}`
            )}
          </h3>
          <dl>
            <dt>Car type:</dt>
            <dd>
              {isEditing ? (
                <>
                  <button
                    type="button"
                    className="enum-button"
                    onClick={toggleCarTypeModal}
                    style={{ cursor: 'pointer' }}
                    aria-label="Edit car type"
                    aria-haspopup="dialog"
                  >
                    {editedCar.carType ? editedCar.carType : "Choose car type"}
                  </button>
                  {isCarTypeModalOpen && (
                    <CarTypeModal
                      toggleModal={toggleCarTypeModal}
                      isCreateCarModalOpen={isCarTypeModalOpen}
                      setSelectedCarType={setSelectedCarType}
                      selectedCarType={editedCar.carType}
                    />
                  )}
                </>
              ) : (
                displayCar.carType
              )}
            </dd>
            <dd>
              Year:{' '}
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
            </dd>
            <dd>
              Fuel:{' '}
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
            </dd>
            <dd>
              Transmission:{' '}
              {isEditing ? (
                <select
                  name="automatic"
                  value={editedCar.automatic ? 'Automatic' : 'Manual'}
                  onChange={handleChange}
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              ) : (
                displayCar.automatic ? 'Automatic' : 'Manual'
              )}
            </dd>
            <dd>
              Passengers:{' '}
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
            </dd>
            <dd>
              Location:{' '}
              {isEditing ? (
                <>
                  <button
                    type="button"
                    className="enum-button"
                    onClick={toggleLocationModal}
                    style={{ cursor: 'pointer' }}
                    aria-label="Edit location"
                  >
                    {editedCar.location ? editedCar.location : "Choose location"}
                  </button>
                  {isLocationModalOpen && (
                    <LocationModal
                      toggleModal={toggleLocationModal}
                      isCreateCarModalOpen={isLocationModalOpen}
                      setSelectedLocation={setSelectedLocation}
                      selectedLocation={editedCar.location}
                    />
                  )}
                </>
              ) : (
                displayCar.location
              )}
            </dd>
            <dd>
              Renting costs:{' '}
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
            </dd>
            <dd>
              Extra Features:{' '}
              {editedCar.extraFeatures && editedCar.extraFeatures.length > 0 ? (
                editedCar.extraFeatures.map((feature) => (
                  <span key={feature.id} className="extra-feature">
                    {feature.name}, {' '}
                  </span>
                ))
              ) : (
                'No extra features'
              )}
              {isEditing && (
                <button
                  className="enum-button"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    toggleExtraFeaturesModal();
                  }}
                  aria-label="Edit extra features"
                >
                  Edit Features
                </button>
              )}
            </dd>
          </dl>
        </div>
        <div className="my-rental-buttons">
          {isEditing ? (
            <div className="save-discard-buttons">
              <button onClick={handleSave} aria-label="Save changes">Save</button>
              <button onClick={handleDiscard} aria-label="Discard changes">Discard</button>
            </div>
          ) : (
            <button className="edit-button" onClick={handleEditClick} aria-label="Edit car">
              <NotePencil size={32} color="#000" className="edit-icon" aria-hidden="true" />
            </button>
          )}
          <button
            className={`availability-toggle-btn ${isAvailable ? "enabled" : "disabled"}`}
            onClick={handleDelete}
            aria-label={isAvailable ? "Mark car as unavailable" : "Mark car as available"}
            aria-pressed={!isAvailable}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </button>
        </div>
      </section>
    </button> 
      {tableVisibility && (
        <section className="rentals-table-section" aria-label="Car rental history">
          {isLoading ? (
            <div role="status" aria-live="polite">Loading rentals...</div>
          ) : rentalDetails && rentalDetails.length > 0 ? (
            <MyRentalsCarTable rentals={rentalDetails} />
          ) : (
            <div className="no-rentals-message" role="status">No rentals for this car.</div>
          )}
        </section>
      )}
      
      {isExtraFeaturesModalOpen && (
        <ExtraFeaturesModal
          toggleModal={toggleExtraFeaturesModal}
          isCreateCarModalOpen={isExtraFeaturesModalOpen}
          setSelectedFeatures={setSelectedFeatures}
          selectedFeatures={
            Array.isArray(editedCar.extraFeatures)
              ? editedCar.extraFeatures.map((feature) => feature.id)
              : []
          }
        />
      )}
    </div>
  );
};

export default MyRentalsCarDisplay;