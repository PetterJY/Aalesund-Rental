import React, { useState, useEffect } from 'react';
import './IntervalSlider.css';

const IntervalSlider = ({ minVal, maxVal, setMinVal, setMaxVal, maxCarRentalPrice, priceRangeRef }) => {
  const intervalStep = 50;

  const updateSlider = () => {
    const minPercent = (minVal / maxCarRentalPrice) * 100;
    const maxPercent = (maxVal / maxCarRentalPrice) * 100;

    document.getElementById('slider-range').style.left = `${minPercent}%`;
    document.getElementById('slider-range').style.width = `${maxPercent - minPercent}%`;
  };

  const handleMinChange = (e) => {
    const newMin = Math.min(parseInt(e.target.value), maxVal - intervalStep); // Prevent overlap
    setMinVal(newMin);
    document.getElementById('slider-min').value = newMin;
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(parseInt(e.target.value), minVal + intervalStep); // Prevent overlap
    setMaxVal(newMax);
    document.getElementById('slider-max').value = newMax;
  };

  const handleMinInputChange = (e) => {
    const newMin = Math.min(Math.max(parseInt(e.target.value) || 0, 0), maxVal - intervalStep); // Clamp value
    setMinVal(newMin);
  };

  const handleMaxInputChange = (e) => {
    const newMax = Math.max(Math.min(parseInt(e.target.value) || maxCarRentalPrice, maxCarRentalPrice), minVal + intervalStep); // Clamp value
    setMaxVal(newMax);
  };

  useEffect(() => {
    updateSlider();
  }, [minVal, maxVal]);

  return (
    <div className="price-range-input-wrapper" ref={priceRangeRef}>
      <input
        type="number"
        id="price-range-min"
        name="minPrice"
        className="price-range-input"
        max={maxCarRentalPrice}
        min="0"
        value={minVal}
        onChange={handleMinInputChange} // Update slider when textbox changes
      />
      <div className="slider-wrapper">
        <div className="slider-track">
          <div className="slider-range" id="slider-range"></div>
        </div>
        <input
          type="range"
          id="slider-min"
          name="minPrice"
          className="price-range-slider"
          min="0"
          max={maxCarRentalPrice}
          step={intervalStep}
          onChange={handleMinChange}
          value={minVal}
        />
        <input
          type="range"
          id="slider-max"
          name="maxPrice"
          className="price-range-slider"
          min="0"
          max={maxCarRentalPrice}
          step={intervalStep}
          onChange={handleMaxChange}
          value={maxVal}
        />
      </div>
      <input
        type="number"
        id="price-range-max"
        name="maxPrice"
        className="price-range-input"
        max={maxCarRentalPrice}
        min="1"
        value={maxVal}
        onChange={handleMaxInputChange} // Update slider when textbox changes
      />
    </div>
  );
};

export default IntervalSlider;