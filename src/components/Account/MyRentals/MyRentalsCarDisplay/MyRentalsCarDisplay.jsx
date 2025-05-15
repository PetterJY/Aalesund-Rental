import React, { useState, useEffect, useRef } from 'react';
import { NotePencil } from "@phosphor-icons/react";
import { mapCarImage } from '../../../utils/CarImageMapper';
import MyRentalsCarTable from '../MyRentalsCarTable/MyRentalsCarTable';
import ExtraFeaturesModal from '../CreateCarModal/EnumModal/ExtraFeaturesModal';
import LocationModal from '../CreateCarModal/EnumModal/LocationModal';
import CarTypeModal from '../CreateCarModal/EnumModal/CarTypeModal';
import { getAccountId, getToken } from '../../../utils/JwtUtility';
import './MyRentalsCarDisplay.css';
import '../../../App.css';

const MyRentalsCarDisplay = ({ car }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [displayCar, setDisplayCar] = useState(car);
  const [editedCar, setEditedCar] = useState(car);
  const [rentalDetails, setRentalDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tableVisibility, setTableVisibility] = useState(false);
  const [isExtraFeaturesModalOpen, setIsExtraFeaturesModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(editedCar.location);
  const [isCarTypeModalOpen, setIsCarTypeModalOpen] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState(editedCar.carType);

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

        searchParams.append("providerId", getAccountId());
        searchParams.append("carId", car.id);

        console.log("Request URL: ", `http://localhost:8080/rentals/my-rentals?${searchParams.toString()}`);
        const response = await fetch(`http://localhost:8080/rentals/my-rentals?${searchParams.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
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
    }

    console.log('Formatted rental details:', formattedDetails);

    return formattedDetails;
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/cars/${car.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(formatRentalDetails(editedCar)),
      });
      if (!response.ok) {
        console.error('Failed to update car:', response.statusText);
        return;
      }
      await response.json();
      console.log('Updated car:', editedCar);
      setDisplayCar(editedCar); 
    } catch (error) {
      console.error('Error updating car:', error);
    }
    setIsEditing(false);
  };

  const handleDiscard = () => {
    setEditedCar(displayCar);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this car?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/cars/${car.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to delete car:', response.statusText);
        return;
      }
      if (response.status === 204) {
        alert('Car deleted successfully!');
        window.location.reload(); 
      }
    } catch (error) {
      console.error('Error deleting car:', error);
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

  editedCar.extraFeatures.map((feature) => {
    console.log('Feature ID:', feature.id);
    console.log('Feature Name:', feature.name);
  });
};

const fetchFeatureName = async (featureId) => {
  try {
    const response = await fetch(`http://localhost:8080/extra-features/${featureId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch feature name:', response.statusText);
      return `Unknown Feature (${featureId})`; 
    }

    const featureData = await response.json();
    return featureData.name;
  } catch (error) {
    console.error('Error fetching feature name:', error);
    return `Unknown Feature (${featureId})`; 
  }
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
                  />{' '}
                  <input
                    placeholder="Model name"
                    type="text"
                    name="modelName"
                    value={editedCar.modelName}
                    onChange={handleChange}
                  />{' '}
                  ~{' '}
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
              Car type:{' '}
              {isEditing ? (
                <>
                  <button
                    type="button"
                    className="enum-button"
                    onClick={toggleCarTypeModal}
                    style={{ cursor: 'pointer' }}
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
            </p>
            <p>
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
            </p>
            <p>
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
            </p>
            <p>
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
            </p>
            <p>
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
            </p>
            <p>
              Location:{' '}
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="enum-button"
                  onClick={toggleLocationModal}
                  style={{ cursor: 'pointer' }}
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
            </p>
            <p>
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
            </p>
            <p>
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
                >
                  Edit Features
                </button>
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
      {tableVisibility &&
        (isLoading ? (
          <div>Loading rentals...</div>
        ) : (
          <MyRentalsCarTable rentals={rentalDetails} />
        ))}
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