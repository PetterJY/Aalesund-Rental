import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, X, PencilSimple } from '@phosphor-icons/react';
import { format } from 'date-fns';
import logo from '../../resources/images/logo.png';
import LoginButton from '../LoginRegister/Login/Login';
import BookingForm from '../BookingForm/BookingForm';
import './Header.css';

const Header = () => {
  const showMenu = useLocation().pathname === "/rental";
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mobileDisplaySize, setMobileDisplaySize] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Booking state
  const [bookingData, setBookingData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    pickupTime: new Date(new Date().setHours(new Date().getHours() + 1, 0)),
    dropoffDate: new Date(new Date().setDate(new Date().getDate() + 13)),
    dropoffTime: new Date(),
  });

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 1500) {
        setMobileDisplaySize(false);
      } else if (window.innerWidth > 1000) {
        setMobileDisplaySize(false);
      } else {
        setMobileDisplaySize(true);
      }
    };

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const navigateToHomePage = () => {
    navigate('/home');
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  const handleXClick = () => setIsMenuOpen(false);

  const handleSaveBooking = (updatedBookingData) => {
    setBookingData(updatedBookingData);
    toggleMenu();
  };

  const DateTimeMenu = () => {
    return (
      <div className={mobileDisplaySize ? "date-time-menu-mobile" : "date-time-menu-desktop"}>
        <div className="date-range-display">
          <div className="location-display">
            {bookingData.pickupLocation} Pickup-location <span className="separator"> - </span> {bookingData.dropoffLocation} Dropoff-location
          </div>
          <div className="time-display">
            {format(bookingData.pickupDate, 'd. MMM')} <span className="separator"> | </span> {format(bookingData.pickupTime, 'HH:mm')}
            <span className="separator"> - </span>
            {format(bookingData.dropoffDate, 'd. MMM')} <span className="separator"> | </span> {format(bookingData.dropoffTime, 'HH:mm')}
          </div>
        </div>
        <button id="showMenuButton" ref={buttonRef} onClick={toggleMenu}>
          <PencilSimple size={24} weight="fill" className="edit-icon" />
        </button>
      </div>
    );
  };

  return (
    <header className="top-header">
      <div className={mobileDisplaySize ? "mobile-header" : "desktop-header"}>
        <button onClick={navigateToHomePage} className="home-button">
          <img src={logo} id="logo-image" alt="Logo" />
        </button>

        {showMenu && !mobileDisplaySize && <DateTimeMenu />}

        <div className={`date-time-popup-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
          <div className="menu-wrapper">
            {mobileDisplaySize && (
              <div className="mobile-display-top-menu">
                <button className="x-button">
                  <X className="x-icon" size={24} weight="bold" onClick={handleXClick}/>
                </button>
                <h2 className="booking-details-title">Your booking details</h2>
              </div>
            )}

            <BookingForm
              initialData={bookingData}
              onSave={handleSaveBooking}
              mobileDisplaySize={mobileDisplaySize}
              onCancel={toggleMenu}
            />
          </div>
        </div>

        <nav className="nav-bar">
          <LoginButton
            showModal={showModal}
            closeModal={closeModal}
            isModalVisible={isModalVisible}
            defaultMode="login"
          />
          <button id="login-create" onClick={showModal}>
            <User size={24} className="user-icon" />
            <span className="login-register-text">Login | Register</span>
          </button>
        </nav>

        {showMenu && mobileDisplaySize && <DateTimeMenu />}
      </div>
    </header>
  );
};

export default Header;