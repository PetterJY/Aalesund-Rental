import React, { useState, useEffect, useRef } from 'react';
import './OrdersDropDown.css';

const OrdersDropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown container

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown
      }
    };

    // Add event listener to detect clicks outside
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="orders-dropdown" ref={dropdownRef}>
      <div
        className="orders-dropdown-selected"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedOption || 'Select an option'}
      </div>
      {isOpen && (
        <ul className="orders-dropdown-options">
          {options.map((option, index) => (
            <li
              key={index}
              className="orders-dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersDropdown;