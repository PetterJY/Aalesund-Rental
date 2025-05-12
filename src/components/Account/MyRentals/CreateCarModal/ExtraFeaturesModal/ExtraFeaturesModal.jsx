import React from 'react';
import { useState, useEffect } from 'react';
import { getToken } from '../../../../utils/JwtUtility';
import '../EnumModal.css';
import '../../../../App.css';

const ExtraFeaturesModal = ({ toggleModal, isCreateCarModalOpen, setSelectedFeatures, selectedFeatures }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [extraFeatures, setExtraFeatures] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFeatureSelection = (featureId) => {
    console.log('Feature selected:', featureId);
    setSelectedFeatures((prevSelected) =>
      prevSelected.includes(featureId)
        ? prevSelected.filter((id) => id !== featureId) // Remove if already selected
        : [...prevSelected, featureId] // Add if not selected
    );
  };

  useEffect(() => {
    if (isCreateCarModalOpen) {
      setIsLoading(true);
      async function fetchExtraFeatures() {
        try {
          const response = await fetch('http://localhost:8080/extra-features', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${getToken()}`,
            },
          });
          if (!response.ok) {
            console.error('Failed to fetch extra features:', response.statusText);
            return;
          }
          const data = await response.json();
          setExtraFeatures(data); 
        } catch (error) {
          console.error('Error fetching extra features:', error);
        } finally {
          setIsLoading(false);
        }
      }
      fetchExtraFeatures();
    }
  }, [isCreateCarModalOpen]);

  return (
    <div className="enum-modal">
      <div className="modal-content">
        <span className="close" onClick={toggleModal}>&times;</span>
        <h2>Select Extra Features</h2>
        <input
          type="text"
          placeholder="Search features..."
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <div className="enum-scrollable">
            {extraFeatures
              .filter((feature) =>
                feature.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((feature) => (
              <div key={feature.id} className="enum-item">
                <label htmlFor={`feature-${feature.id}`}>{feature.name}</label>
                <input
                  type="checkbox"
                  id={`feature-${feature.id}`}
                  value={feature.id}
                  onChange={() => handleFeatureSelection(feature.id)}
                  checked={selectedFeatures.includes(feature.id)}
                />
             </div>
            ))}
          </div>
        )}
        <button className="confirm-button" onClick={toggleModal}>Confirm</button>
      </div>
    </div>
  );
}

export default ExtraFeaturesModal;