import React, { useState, useEffect } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { mapCarImage } from '../../utils/CarImageMapper';
import './FeaturedCars.css'


const FeaturedCars = () => {
  const [cars, setCars] = useState([]);
  const [cardOrder, setCardOrder] = useState([0, 1, 2, 3, 4]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

useEffect(() => {
  async function fetchCars() {
    try {
      const response = await fetch('http://localhost:8080/cars', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch cars');
      const data = await response.json();
      setCars(data.slice(0, 5)); // Show only 5 featured cars
      setCardOrder([...Array(Math.min(5, data.length)).keys()]);
    } catch (error) {
      console.error(error);
    }
  }
  fetchCars();
  }, []);

  const handleNextClick = () => {
    if (isButtonDisabled) return;

    if (autoPlayInterval) clearInterval(autoPlayInterval);
    const interval = setInterval(() => {
      handlePreviousClick();
    }, 20000);
    setAutoPlayInterval(interval);

    setCardOrder(prev => [...prev.slice(1), prev[0]]);
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500);
  };

  const handlePreviousClick = () => {
    if (isButtonDisabled) return;

    setCardOrder(prev => [prev[prev.length - 1], ...prev.slice(0, -1)]);
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500);
  };

  const pauseAutoplay = () => {
    console.log("paused autoplay!")
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }
  };

  const resumeAutoplay = () => {
    console.log("resumed autoplay!")
    if (!autoPlayInterval) {
      const interval = setInterval(() => {
        handleNextClick();
      }, 20000);
      setAutoPlayInterval(interval);
    }
  }

  const isCardActive = (cardId) => {
    const position = cardOrder.indexOf(cardId);
    return position >= 1 && position <= 3;
  }

  const getCardPosition = (cardId) => {
    const position = cardOrder.indexOf(cardId);
    if (position === 0) return 'hidden-card-left';
    if (position === 1) return 'car-left-card';
    if (position === 2) return 'car-right-card';
    if (position === 3) return 'hidden-card-right';
    if (position === 4) return 'hidden-card-right';
  }

  const shouldIndicatorBeActive = (cardId) => {
    const position = cardOrder.indexOf(cardId);
    return position === 0;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handlePreviousClick();
      console.log(cardOrder);
    }, 200000);

    setAutoPlayInterval(interval);

    return () => {
      clearInterval(interval);
    }
  }, []);


  return (
    <div className="featured-cars-wrapper">
      <div className="featured-cars-slideshow">
        <h1>Our Featured Cars</h1>
        <div className="featured-cars-with-controls">
          <div className="featured-cars">
            {cardOrder.map((orderIdx, idx) => {
              const car = cars[orderIdx];
              console.log(car);
              if (!car) return null;
              return (
                <div
                  key={car.id}
                  onMouseEnter={pauseAutoplay}
                  onMouseLeave={resumeAutoplay}
                  className={`featured-car ${isCardActive(idx) ? 'active' : ''} ${getCardPosition(idx)}`}
                  id={`featured-car-${idx + 1}`}
                >
                  <img
                    src={mapCarImage(car.carBrand, car.modelName)}
                    alt={`${car.carBrand} ${car.modelName}`}
                    className="featured-car-image"
                  />
                  <div className="featured-car-info">
                    <h2>{car.carBrand} {car.modelName} {car.id}</h2>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="featured-cars-controls">
            <div className="indicators">
              <div className={`indicator ${shouldIndicatorBeActive(0) ? 'active' : ''}`}/>
              <div className={`indicator ${shouldIndicatorBeActive(1) ? 'active' : ''}`}/>
              <div className={`indicator ${shouldIndicatorBeActive(2) ? 'active' : ''}`}/>
              <div className={`indicator ${shouldIndicatorBeActive(3) ? 'active' : ''}`}/>
              <div className={`indicator ${shouldIndicatorBeActive(4) ? 'active' : ''}`}/>
            </div>
            <div className="buttons">
              <button className={`prev-button ${isButtonDisabled ? 'disabled' : ''}`}
                      onClick={handlePreviousClick}
                      disabled={isButtonDisabled}>
                <CaretLeft size={18} weight="bold" className="caret-icon" id="caret-previous"/>
              </button>
              <button className={`next-button ${isButtonDisabled ? 'disabled' : ''}`}
                      onClick={handleNextClick}
                      disabled={isButtonDisabled}>
                <CaretRight size={18} weight="bold" className="caret-icon" id="caret-next"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCars;
