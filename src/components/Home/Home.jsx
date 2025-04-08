// src/pages/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../../components/BookingForm/BookingForm';
import './Home.css';
import testimonialPersonImg from '../../resources/images/testimonialPerson.png';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';


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

  const handleNextClick = () => {

  }

  const handlePrevClick = () => {

  }

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
            <button className="prev-button" onClick={handlePrevClick}><CaretLeft size={36} weight="bold" className="caret-icon"/></button>
            <button className="next-button" onClick={handleNextClick}><CaretRight size={36} weight="bold" className="caret-icon"/></button>
            <h2>What Our Customers Say</h2>
            <div className="testimonials">
              <div className="testimonial">
                <p>"Great service and friendly staff!"</p>
                <p>- John Doe</p>
                <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
              </div>
              <div className="testimonial">
                <p>"The best car rental experience I've ever had!"</p>
                <p>- Jane Smith</p>
                <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
              </div>
              <div className="testimonial">
                <p>"Great service and friendly staff!"</p>
                <p>- John Doe</p>
                <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
              </div>
              <div className="testimonial">
                <p>"The best car rental experience I've ever had!"</p>
                <p>- Jane Smith</p>
                <img src={testimonialPersonImg} alt="Testimonial" className="testimonial-image"/>
              </div>
              <div className="testimonial">
                <p>"Great service and friendly staff!"</p>
                <p>- John Doe</p>
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