import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm/BookingForm';
import Testimonials from "./Testimonials/Testimonials";
import Reputation from "./Reputation/Reputation";
import FeaturedCars from "./FeaturedCars/FeaturedCars";
import CallToAction from "./CallToAction/CallToAction";
import '../App.css';
import './Home.css';
import {BookingContext} from "../utils/BookingContext";

const Home = () => {
  const navigate = useNavigate();
  const [mobileDisplaySize, setMobileDisplaySize] = useState(false);

  const {bookingData} = useContext(BookingContext)

  useEffect(() => {
    const handleWindowResize = () => {
      setMobileDisplaySize(window.innerWidth <= 1000);
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const handleBookingSubmit = () => {
    navigate('/rental');
  };

  const HeroCallToAction = () => {
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
      setIsRendered(true);
    }, []);

    return (
      <div className="hero-call-to-action">
        <h1 className={`${isRendered ? 'fade-and-drop-in' : ''}`}>Ready to Take a Trip?</h1>
        <h2 className={`${isRendered ? 'fade-in' : ''}`}>Our cars can take you anywhere, anytime.</h2>
      </div>
    );
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="booking-form-container">
          <BookingForm
            initialData={bookingData}
            onSave={handleBookingSubmit}
            mobileDisplaySize={mobileDisplaySize}
            />
        </div>
      </div>
      <HeroCallToAction />
      <FeaturedCars />
      <div className="intermediary-1"/>
      <Reputation />
      <div className="intermediary-2"/>
      <Testimonials />
      <div className="intermediary-3" />
      <CallToAction />
    </div>
  );
};

export default Home;