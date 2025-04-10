import React, { useState, useEffect } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import './FeaturedCars.css'
import VWgolf from '../../resources/images/cars/VWgolf.png'
import TeslaModel3 from '../../resources/images/cars/TeslaModel3.webp'
import TeslaModelY from '../../resources/images/cars/TeslaModelY.png'
import BMWm3 from '../../resources/images/cars/BMWm3.png'
import Peugot3008 from '../../resources/images/cars/Peugot3008.png'
import VWtransporter from '../../resources/images/cars/VWtransporter.png'


const FeaturedCars = () => {
  const [cardOrder, setCardOrder] = useState([0, 1, 2, 3, 4]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

  const handlePrevClick = () => {
    if (isButtonDisabled) return;

    if (autoPlayInterval) clearInterval(autoPlayInterval);
    const interval = setInterval(() => {
      handleNextClick();
    }, 20000);
    setAutoPlayInterval(interval);

    setCardOrder(prev => [...prev.slice(1), prev[0]]);
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 500);
  };

  const handleNextClick = () => {
    // console.log("clicked next!")
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
    if (position === 1) return 'left-card';
    if (position === 2) return 'center-card';
    if (position === 3) return 'right-card';
    if (position === 4) return 'hidden-card-right';
  }

  useEffect(() => {
    console.log("event listener added!")
    const interval = setInterval(() => {
      handleNextClick();
    }, 20000);

    setAutoPlayInterval(interval);

    return () => {
      clearInterval(interval);
    }
  }, []);


  return (
    <div className="featured-cars-wrapper">
      <div className="featured-cars-section">
        <div className="featured-cars-slideshow">
          <button className={`prev-button ${isButtonDisabled ? 'disabled' : ''}`}
                  onClick={handlePrevClick}
                  disabled={isButtonDisabled}>
            <CaretLeft size={36} weight="bold" className="caret-icon"/>
          </button>
          <button className={`next-button ${isButtonDisabled ? 'disabled' : ''}`}
                  onClick={handleNextClick}
                  disabled={isButtonDisabled}>
            <CaretRight size={36} weight="bold" className="caret-icon"/>
          </button>
          <h1>Our Featured Cars</h1>
          <div className="featured-cars">
            <div
              onMouseEnter={pauseAutoplay}
              onMouseLeave={resumeAutoplay}
              className={`featured-car ${isCardActive(0) ? 'active' : ''} ${getCardPosition(0)}`}
              id="featured-car-1">
              <img src={TeslaModel3} alt="Tesla-Model-3-car" className="featured-car-image"/>
            </div>
            <div
              onMouseEnter={pauseAutoplay}
              onMouseLeave={resumeAutoplay}
              className={`featured-car ${isCardActive(1) ? 'active' : ''} ${getCardPosition(1)}`}
              id="featured-car-2">
              <img src={TeslaModelY} alt="Tesla-Model-Y-car" className="featured-car-image"/>
            </div>
            <div
              onMouseEnter={pauseAutoplay}
              onMouseLeave={resumeAutoplay}
              className={`featured-car ${isCardActive(2) ? 'active' : ''} ${getCardPosition(2)}`}
              id="featured-car-3">
              <img src={BMWm3} alt="BMW-M3-car" className="featured-car-image"/>
            </div>
            <div
              onMouseEnter={pauseAutoplay}
              onMouseLeave={resumeAutoplay}
              className={`featured-car ${isCardActive(3) ? 'active' : ''} ${getCardPosition(3)}`}
              id="featured-car-4">
              <img src={Peugot3008} alt="bmw-car" className="featured-car-image"/>
            </div>
            <div
              onMouseEnter={pauseAutoplay}
              onMouseLeave={resumeAutoplay}
              className={`featured-car ${isCardActive(4) ? 'active' : ''} ${getCardPosition(4)}`}
              id="featured-car-5">
              <img src={VWtransporter} alt="bmw-car" className="featured-car-image"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCars;
