import React, {useState, useEffect, useContext, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm/BookingForm';
import Testimonials from "./Testimonials/Testimonials";
import Reputation from "./Reputation/Reputation";
import FeaturedCars from "./FeaturedCars/FeaturedCars";
import CallToAction from "./CallToAction/CallToAction";
import '../App.css';
import './Home.css';
import {BookingContext} from "../utils/BookingContext";
import callToAction from "./CallToAction/CallToAction";

const Home = () => {
  const navigate = useNavigate();
  const [mobileDisplaySize, setMobileDisplaySize] = useState(false);
  const callToActionRef = useRef(null);

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

  useEffect(() => {
    const callToAction = callToActionRef.current;
    const triggerPoint = 500;

    const handleScroll = () => {
      if (window.scroll > triggerPoint) {
        callToAction.style.position = 'absolute';
        callToAction.style.top = `${triggerPoint}px`;
      } else {
        callToAction.style.position = 'fixed';
        callToAction.style.top = '0';

      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const HeroCallToAction = () => {
    const [isRendered, setIsRendered] = useState(false);


    useEffect(() => {
      setIsRendered(true);
    }, []);

    return (
      <div className="hero-call-to-action" ref={callToAction}>
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