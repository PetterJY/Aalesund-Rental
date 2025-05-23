import React from 'react';
import { useState, useEffect } from 'react';
import { getToken, makeApiRequest } from '../../../../utils/JwtUtility';
import './EnumModal.css';

const ExtraFeaturesModal = ({
  toggleModal,
  isCreateCarModalOpen,
  setSelectedFeatures,
  selectedFeatures = [], // Default to an empty array
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [extraFeatures, setExtraFeatures] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

const handleFeatureSelection = (featureId) => {

  setSelectedFeatures((prevSelected) => {
    if (!Array.isArray(prevSelected)) {
      return []; 
    }

    return prevSelected.includes(featureId)
      ? prevSelected.filter((id) => id !== featureId)
      : [...prevSelected, featureId]; 
  });
};

  useEffect(() => {
    if (isCreateCarModalOpen) {
      setIsLoading(true);
      
      async function fetchExtraFeatures() {
        try {
          const data = await makeApiRequest('https://norwegian-rental.online/api/extra-features');
          setExtraFeatures(data);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }
      
      fetchExtraFeatures();
    }
  }, [isCreateCarModalOpen]);

  return (
  <dialog 
    className="enum-modal" 
    open={isCreateCarModalOpen}
    aria-labelledby="extra-features-title"
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
      <h2 id="extra-features-title">Select Extra Features</h2>
      <input
        type="text"
        placeholder="Search features..."
        className="search-input"
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search extra features"
      />
      {isLoading && <p role="status" aria-live="polite">Loading...</p>}
      {!isLoading && (
        <fieldset className="enum-scrollable">
          <legend className="visually-hidden">Available extra features</legend>
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
        </fieldset>
      )}
      <button 
        className="confirm-button" 
        onClick={toggleModal} 
        aria-label="Confirm extra features selection"
      >
        Confirm
      </button>
    </div>
  </dialog>
  );
};

export default ExtraFeaturesModal;