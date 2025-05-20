import React, { useState, useEffect } from 'react';
import { getToken } from '../../../../utils/JwtUtility';
import './EnumModal.css'

const CarTypeModal = ({ toggleModal, isCreateCarModalOpen, setSelectedCarType, selectedCarType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [carTypes, setCarTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const handleCarTypeSelection = (carTypeId) => {
    setSelectedCarType(carTypeId);
  };

  useEffect(() => {
    if (isCreateCarModalOpen) {
      setIsLoading(true);
      setError(null); // Reset error state
      async function fetchCarTypes() {
        try {
          const response = await fetch('http://localhost:8080/cars/car-types', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`,
            },
          });
          if (!response.ok) {
            throw new Error(`Failed to fetch car types: ${response.statusText}`);
          }
          const data = await response.json();
          setCarTypes(data);
          console.log('Fetched car types:', data);
        } catch (error) {
          console.error('Error fetching car types:', error);
          setError('Failed to load car types. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      }
      fetchCarTypes();
    }
  }, [isCreateCarModalOpen]);

  return (
    <div className="enum-modal">
      <div className="modal-content">
        <span className="close" onClick={toggleModal} aria-label="close Modal">&times;</span>
        <h2>Select Car Type</h2>
        <input
          type="text"
          placeholder="Search car types..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {isLoading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {!isLoading && !error && (
          <div className="enum-scrollable">
            {carTypes
              .filter((carType) => carType.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((carType) => (
                <div key={carType} className="enum-item">
                  <label htmlFor={`car-type-${carType}`}>{carType}</label>
                  <input
                    type="radio"
                    id={`car-type-${carType}`}
                    name="car-type"
                    value={carType}
                    onChange={() => handleCarTypeSelection(carType)}
                    checked={selectedCarType === carType}
                  />
                </div>
              ))}
          </div>
        )}
        <button className="confirm-button" onClick={toggleModal} aria-label="Confirm car type selection">Confirm</button>
      </div>
    </div>
  );
};

export default CarTypeModal;