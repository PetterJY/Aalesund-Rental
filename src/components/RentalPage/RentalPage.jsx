import "../global.css";
import './RentalPage.css';
import React, { useState } from "react";
import { FunnelSimple, CaretDown } from "@phosphor-icons/react";

export default function RentalPage(props) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    sort: [],
    carType: [],
    transmission: [],
    passengers: []
  });
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  const handleCheckboxChange = (category, value) => {
    setFilters(prev => {
      const categoryValues = prev[category];
      if (categoryValues.includes(value)) {
        return {
          ...prev,
          [category]: categoryValues.filter(item => item !== value)
        };
      } else {
        return {
          ...prev,
          [category]: [...categoryValues, value]
        };
      }
    });
  };

  const renderCheckboxes = (category, options) => (
    <div className="checkbox-group">
      {options.map(({ value, label }) => (
        <label key={value} className="checkbox-label">
          <input
            type="checkbox"
            checked={filters[category].includes(value)}
            onChange={() => handleCheckboxChange(category, value)}
          />
          {label}
        </label>
      ))}
    </div>
  );

  const renderDropdown = (category, title, options) => (
    <div className="dropdown-group">
      <button
        className="dropdown-button"
        onClick={() => toggleDropdown(category)}
      >
        {title} <CaretDown size={16} />
      </button>
      {openDropdown === category && (
        <div className="dropdown-content">
          {renderCheckboxes(category, options)}
        </div>
      )}
    </div>
  );

  const filterOptions = {
    sort: [
      { value: "newest", label: "Newest" },
      { value: "price", label: "Price" },
      { value: "alphabet", label: "Alphabet" }
    ],
    carType: [
      { value: "sedan", label: "Sedan" },
      { value: "suv", label: "SUV" },
      { value: "truck", label: "Truck" },
      { value: "coupe", label: "Coupe" },
      { value: "convertible", label: "Convertible" },
      { value: "electric", label: "Electric" },
      { value: "hybrid", label: "Hybrid" },
      { value: "diesel", label: "Diesel" },
      { value: "gas", label: "Gas" },
      { value: "luxury", label: "Luxury" }
    ],
    transmission: [
      { value: "automatic", label: "Automatic" },
      { value: "manual", label: "Manual" }
    ],
    passengers: [
      { value: "2", label: "2+" },
      { value: "4", label: "4+" },
      { value: "5", label: "5+" },
      { value: "7", label: "7+" }
    ]
  };

  return (
    <div className="rental-page">
      <section className="main-section">
        <div>
          <nav className="sort-bar">
            {renderDropdown("sort", "Sort", filterOptions.sort)}
            {renderDropdown("carType", "Car Type", filterOptions.carType)}
            {renderDropdown("transmission", "Transmission", filterOptions.transmission)}
            {renderDropdown("passengers", "Passengers", filterOptions.passengers)}
            <button className="filter-button" onClick={toggleFilter}>
              <FunnelSimple size={20} color="#252322" /> Sort and filter
            </button>
          </nav>

          {/* Filter panel for mobile */}
          {isFilterOpen && (
            <div className="filter-panel">
              <h2>Sort and Filter</h2>
              <div className="filter-group">
                <h3>Sort</h3>
                {renderCheckboxes("sort", filterOptions.sort)}
              </div>
              <div className="filter-group">
                <h3>Car Type</h3>
                {renderCheckboxes("carType", filterOptions.carType)}
              </div>
              <div className="filter-group">
                <h3>Transmission</h3>
                {renderCheckboxes("transmission", filterOptions.transmission)}
              </div>
              <div className="filter-group">
                <h3>Passengers</h3>
                {renderCheckboxes("passengers", filterOptions.passengers)}
              </div>
              <button className="close-button" onClick={toggleFilter}>Close</button>
            </div>
          )}

          <main className="main-body">
            {props.children}
          </main>
        </div>
      </section>
    </div>
  );
}