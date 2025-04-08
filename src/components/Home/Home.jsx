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
      <div className="testimonials-wrapper">
        <div className="testimonials-section">
          <div className="testimonials-slideshow">
            <div className="testimoinal-controls">
              <button className="prev-button">Prev</button>
              <button className="next-button">Next</button>
            </div>
          <h2>What Our Customers Say</h2>
          <div className="testimonials">
            <div className="testimonial">
              <p>"Great service and friendly staff!"</p>
              <p>- John Doe</p>
            </div>
            <div className="testimonial">
              <p>"The best car rental experience I've ever had!"</p>
              <p>- Jane Smith</p>
            </div>
            <div className="testimonial">
              <p>"The best car rental experience I've ever had!"</p>
              <p>- Jane Smith</p>
            </div>
            <div className="testimonial">
              <p>"The best car rental experience I've ever had!"</p>
              <p>- Jane Smith</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;