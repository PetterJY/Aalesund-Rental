import React from 'react';
import './DropDownSuggestions.css';

const DropDownSuggestions = ({
  locations = [],
  setLocationSuggestions,
  setLocationValue,
  setShowSuggestions,
}) => {
  if (!locations.length) return null;

  const handleSuggestionClick = (suggestion) => {
    setLocationValue(suggestion);
    if (setShowSuggestions) setShowSuggestions(false);
  };

  return (
    <ul className="dropdown-suggestions">
      {locations.map((suggestion, suggestionId) => (
        <li
          key={suggestionId}
          className="dropdown-suggestion-item"
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default DropDownSuggestions;