import React, { useState, useEffect } from 'react';
import { getToken, makeApiRequest } from '../../../../utils/JwtUtility';
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
      setError(null); 
      async function fetchCarTypes() {
        try {
          const data = await makeApiRequest('http://localhost:8080/api/cars/car-types');
          setCarTypes(data);
        } catch (error) {
          
          setError('Failed to load car types. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      }
      fetchCarTypes();
    }
  }, [isCreateCarModalOpen]);

  return (
  <dialog 
    className="enum-modal" 
    open={isCreateCarModalOpen}
    aria-labelledby="car-type-modal-title"
    aria-modal="true"
  >
    <div className="modal-content">
      <button 
        className="close" 
        onClick={toggleModal} 
        aria-label="Close modal"
      >
        &times;
      </button>
      <h2 id="car-type-modal-title">Select Car Type</h2>
      <input
        type="text"
        placeholder="Search car types..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search car types"
      />
      {isLoading && <p role="status" aria-live="polite">Loading...</p>}
      {error && <p className="error-message" role="alert">{error}</p>}
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
      <button 
        className="confirm-button" 
        onClick={toggleModal} 
        aria-label="Confirm car type selection"
      >
        Confirm
      </button>
    </div>
  </dialog>
  );
};

export default CarTypeModal;