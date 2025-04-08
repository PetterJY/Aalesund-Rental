// src/pages/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../../components/BookingForm/BookingForm';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [mobileDisplaySize, setMobileDisplaySize] = useState(false);

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
      {/* Rest of your home page content */}
    </div>
  );
};

export default Home;