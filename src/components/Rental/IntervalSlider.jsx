import React, { useState, useEffect } from 'react';
import './IntervalSlider.css';

const IntervalSlider = ({ maxPrice = 1000 }) => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(1000);
  const intervalStep = 50;

  const updateSlider = () => {
    const minPercent = (minVal / maxPrice) * 100;
    const maxPercent = (maxVal / maxPrice) * 100;

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

  useEffect(() => {
    const minPriceDisplayValue = document.getElementById("price-range-min");
    minPriceDisplayValue.setAttribute("value", minVal);

    const maxPriceDisplayValue = document.getElementById("price-range-max");
    maxPriceDisplayValue.setAttribute("value", maxVal);

    if (minVal > maxVal) {
      setMinVal(maxVal);
      setMaxVal(minVal);
    }
  }, [minVal, maxVal]);

  useEffect(() => {
    updateSlider();
  }, [minVal, maxVal]);

  return (
    <div className="price-range">
      <h3>Price Range</h3>
      <div className="price-range-input-wrapper">
        <input
          type="number"
          id="price-range-min"
          className="price-range-input"
          max={maxPrice}
          min="0"
        />
        <div className="slider-wrapper">
          <div className="slider-track">
            <div className="slider-range" id="slider-range"></div>
          </div>
          <input
            type="range"
            id="slider-min"
            className="price-range-slider"
            min="0"
            max={maxPrice}
            step={intervalStep}
            onChange={handleMinChange}
          />
          <input
            type="range"
            id="slider-max"
            className="price-range-slider"
            min="0"
            max={maxPrice}
            step={intervalStep}
            onChange={handleMaxChange}
          />
        </div>
        <input
          type="number"
          id="price-range-max"
          className="price-range-input"
          max={maxPrice}
          min="1"
        />
      </div>
    </div>
  );
};

export default IntervalSlider;