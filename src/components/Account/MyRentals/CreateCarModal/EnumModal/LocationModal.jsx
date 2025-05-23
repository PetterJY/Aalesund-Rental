import { useState, useEffect } from 'react';
import { getToken } from '../../../../utils/JwtUtility';
import './EnumModal.css'

const LocationModal = ({ toggleModal, isCreateCarModalOpen, setSelectedLocation, selectedLocation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const handleLocationSelection = (location) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    if (isCreateCarModalOpen) {
      setIsLoading(true);
      setError(null); 
      
      async function fetchLocations() {
        try {
          const response = await fetch('http://localhost:8080/api/cars/locations', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`,
            },
          });
          if (!response.ok) {
            throw new Error(`Failed to fetch locations: ${response.statusText}`);
          }
          const data = await response.json();
          setLocations(data); // Expecting an array of strings (enum values)
        } catch (error) {
          console.error('Error fetching locations:', error);
          setError('Failed to load locations. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      }
      
      fetchLocations();
    }
  }, [isCreateCarModalOpen]);

  return (
  <dialog 
    className="enum-modal"
    open={isCreateCarModalOpen}
    aria-labelledby="location-modal-title"
    aria-modal="true"
  >
    <div className="modal-content">
      <button 
        className="close" 
        onClick={toggleModal}
        aria-label="Close location selection"
      >
        &times;
      </button>
      <h2 id="location-modal-title">Select Location</h2>
      <input
        type="text"
        placeholder="Search locations..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search locations"
      />
      {isLoading && <p role="status" aria-live="polite">Loading...</p>}
      {error && <p className="error-message" role="alert">{error}</p>}
      {!isLoading && !error && (
        <div className="enum-scrollable" role="radiogroup" aria-label="Available locations">
          {locations
            .filter((location) => location.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((location) => (
              <div key={location} className="enum-item">
                <label htmlFor={`location-${location}`}>{location}</label>
                <input
                  type="radio"
                  id={`location-${location}`}
                  name="location"
                  value={location}
                  onChange={() => handleLocationSelection(location)}
                  checked={selectedLocation === location}
                />
              </div>
            ))}
        </div>
      )}
      <button className="confirm-button" onClick={toggleModal} aria-label="Confirm location selection">Confirm</button>
    </div>
  </dialog>
  );
};

export default LocationModal;