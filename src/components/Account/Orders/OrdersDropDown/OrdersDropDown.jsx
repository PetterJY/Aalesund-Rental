import React, { useState, useEffect, useRef } from 'react';
import './OrdersDropDown.css';

const OrdersDropdown = ({ options, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  
  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex(0);
    } else if (isOpen) {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setFocusedIndex(-1);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => (prev <= 0 ? options.length - 1 : prev - 1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => (prev >= options.length - 1 ? 0 : prev + 1));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0) {
            onSelect(options[focusedIndex]);
            setIsOpen(false);
            setFocusedIndex(-1);
          }
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="orders-dropdown" ref={dropdownRef}>
      <button
        ref={buttonRef}
        className="orders-dropdown-selected"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select filter option"
      >
        {selectedOption || 'Select an option'}
      </button>
      
      {isOpen && (
        <ul 
          className="orders-dropdown-options" 
          role="listbox"
          aria-activedescendant={focusedIndex >= 0 ? `option-${focusedIndex}` : undefined}
          tabIndex="-1"
        >
          {options.map((option, index) => (
            <li
              id={`option-${index}`}
              key={index}
              className={`orders-dropdown-option ${focusedIndex === index ? 'focused' : ''}`}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => setFocusedIndex(index)}
              role="option"
              aria-selected={selectedOption === option}
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