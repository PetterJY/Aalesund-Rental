// src/pages/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../../components/BookingForm/BookingForm';
import './Home.css';
import testimonialPersonImg from '../../resources/images/testimonialPerson.png';
import { CaretLeft, CaretRight, Quotes, Star } from '@phosphor-icons/react';


const Home = () => {
  const navigate = useNavigate();
  const [mobileDisplaySize, setMobileDisplaySize] = useState(false);
  // const [activeCards, setActiveCards] = useState([1, 2, 3]);
  const [cardOrder, setCardOrder] = useState([0, 1, 2, 3, 4]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

  const handlePrevClick = () => {
    if (isButtonDisabled) return;

    if (autoPlayInterval) clearInterval(autoPlayInterval);
    const interval = setInterval(() => {
      handleNextClick();
    }, 5000);
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
      }, 5000);
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
    }, 5000);

    setAutoPlayInterval(interval);

    return () => {
      clearInterval(interval);
    }
  }, []);


  useEffect(() => {
    const handleWindowResize = () => {
      setMobileDisplaySize(window.innerWidth <= 1000);
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const handleBookingSubmit = (bookingData) => {
    // Handle the booking data here
    console.log('Booking data:', bookingData);
    // Navigate to search results or rental page
    navigate('/rental', { state: { bookingData } });
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="booking-form-container">
          <BookingForm
            onSave={handleBookingSubmit}
            mobileDisplaySize={mobileDisplaySize}
          />
        </div>
      </div>
      <div className="testimonials-wrapper">
        <div className="testimonials-section">
          <div className="testimonials-slideshow">
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
            <h1>What Our Customers Say</h1>
            <div className="testimonials">
              <div
                onMouseEnter={pauseAutoplay}
                onMouseLeave={resumeAutoplay}
                className={`testimonial ${isCardActive(0) ? 'active' : ''} ${getCardPosition(0)}`} id="testimonial-1">
                <Quotes weight="fill" className="quote-icon"/>
                <p className="testimonial-quote">"1 Great service and friendly staff!"</p>
                <p className="testimonial-name">- John Doe</p>
                <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
              </div>
              <div
                onMouseEnter={pauseAutoplay}
                onMouseLeave={resumeAutoplay}
                className={`testimonial ${isCardActive(1) ? 'active' : ''} ${getCardPosition(1)}`} id="testimonial-2">
                <Quotes weight="fill" className="quote-icon"/>
                <p className="testimonial-quote">"2 The best car rental experience I've ever had!"</p>
                <p className="testimonial-name">- Jane Smith</p>
                <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
              </div>
              <div
                onMouseEnter={pauseAutoplay}
                   onMouseLeave={resumeAutoplay}
                className={`testimonial ${isCardActive(2) ? 'active' : ''} ${getCardPosition(2)}`} id="testimonial-3">
                <Quotes weight="fill" className="quote-icon"/>
                <p className="testimonial-quote">"3 Great service and friendly staff!"</p>
                <p className="testimonial-name">- John Doe</p>
                <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
              </div>
              <div
                onMouseEnter={pauseAutoplay}
                onMouseLeave={resumeAutoplay}
                className={`testimonial ${isCardActive(3) ? 'active' : ''} ${getCardPosition(3)}`} id="testimonial-4">
                <Quotes weight="fill" className="quote-icon"/>
                <p className="testimonial-quote">"4 The best car rental experience I've ever had!"</p>
                <p className="testimonial-name">- Jane Smith</p>
                <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
              </div>
              <div
                onMouseEnter={pauseAutoplay}
                onMouseLeave={resumeAutoplay}
                className={`testimonial ${isCardActive(4) ? 'active' : ''} ${getCardPosition(4)}`} id="testimonial-5">
                <Quotes weight="fill" className="quote-icon"/>
                <p className="testimonial-quote">"5 Great service and friendly staff!"</p>
                <p className="testimonial-name">- John Doe</p>
                <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
              </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;