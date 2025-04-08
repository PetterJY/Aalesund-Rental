import React, {useEffect, useRef, useState} from 'react';
import LoginButton from '../LoginRegister/Login/Login';
import logo from '../../resources/images/logo.png';
import '../App.css';
import './Header.css';
import {PencilSimple, User, MagnifyingGlass, XCircle, X} from "@phosphor-icons/react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-datepicker/dist/react-datepicker.css";
import {format} from 'date-fns';
import { useNavigate, useLocation } from "react-router-dom";
import DateTimePicker from '../BookingForm/DateTimePicker';

const Header = () => {
  const showMenu = useLocation().pathname === "/rental";
  const navigate = useNavigate();
  const pickupTextFieldRef = useRef(null);
  const dropoffTextFieldRef = useRef(null);
  const [pickupLocationValue, setPickupLocationValue] = useState("");
  const [dropoffLocationValue, setDropoffLocationValue] = useState("");
  const [isPickupTextInputHovered, setIsPickupTextInputHovered] = useState(false);
  const [isDropoffTextInputHovered, setIsDropoffTextInputHovered] = useState(false);
  const [isPickupTextFieldSelected, setIsPickupTextFieldSelected] = useState(false);
  const [isDropoffTextFieldSelected, setIsDropoffTextFieldSelected] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [mobileDisplaySize, setMobileDisplaySize] = useState(false);

  const [pickupDate, setPickupDate] = useState(() => {
    const time = new Date();
    time.setDate(time.getDate()+1)
    return time;
  });

  const [dropoffDate, setDropoffDate] = useState(() => {
    const time = new Date();
    time.setDate(time.getDate()+13);
    return time;
  });

  const [pickupTime, setPickUpTime] = useState(() => {
    const time = new Date();
    time.setHours(time.getHours()+1);
    time.setMinutes(0);
    return time;
  });

  const [dropoffTime] = useState(() => {
    const time = new Date();
    time.setHours(time.getHours()+1);
    time.setMinutes(0);
    return time;
  });

  const handlePickupDateChange = (date) => {
    if (dropoffDate !== null && date !== null) {
      if (date.getTime() > dropoffDate.getTime()) {
        setDropoffDate(date);
        setPickupDate(null);
      } else {
        setPickupDate(date);
      }
    }
  }

  const handleDropoffDateChange = (date) => {
    if (pickupDate !== null && date !== null) {
      if (pickupDate.getTime() > date.getTime()) {
        setPickupDate(date);
        setDropoffDate(null);
      } else {
        setDropoffDate(date);
      }
    }
  }

  const handleDropoffTimeChange = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const newTime = new Date();
    newTime.setHours(hours);
    newTime.setMinutes(minutes);
    setPickUpTime(newTime);  }

  const handlePickupTimeChange = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const newTime = new Date();
    newTime.setHours(hours);
    newTime.setMinutes(minutes);
    setPickUpTime(newTime);
  }

  function handlePickupXCircleClick() {
    const inputField = document.getElementById("pickup-destination-input-field");
    inputField.value = "";
    inputField.focus();
    setPickupLocationValue("");
  }

  function handleDropoffXCircleClick() {
    const inputField = document.getElementById("dropoff-destination-input-field");
    inputField.value = "";
    inputField.focus();
    setDropoffLocationValue("");
  }

  const handleXClick = () => {
    setIsMenuOpen(false);
  }

  const navigateToHomePage = () => {
    navigate('/home');
  }

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isPickupTextFieldSelected &&
        pickupTextFieldRef.current &&
        !pickupTextFieldRef.current.contains(event.target)
      ) {
        setIsPickupTextFieldSelected(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return() => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPickupTextFieldSelected]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropoffTextFieldSelected &&
        dropoffTextFieldRef.current &&
        !dropoffTextFieldRef.current.contains(event.target)
      ) {
        setIsDropoffTextFieldSelected(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return() => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropoffTextFieldSelected]);

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 1500) {
        setMobileDisplaySize(false);
      } else if (window.innerWidth > 1000) {
        setMobileDisplaySize(false);
      } else {
        setMobileDisplaySize(true);
      }
    }

    handleWindowResize();

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleSave = () => {
    toggleMenu();
  };

  const dateTimeMenu = () => {
    return (
      <div className={mobileDisplaySize ? "date-time-menu-mobile" : "date-time-menu-desktop"}>
      <div className="date-range-display">
        <div className="location-display">
          {pickupLocationValue} Pickup-location <span className="separator"> - </span> {dropoffLocationValue} Dropoff-location
        </div>
        <div className="time-display">
          {format(pickupDate, 'd. MMM')} <span className="separator"> | </span> {format(pickupTime, 'HH:mm')}
          <span className="separator"> - </span>
          {format(dropoffDate, 'd. MMM')} <span className="separator"> | </span> {format(dropoffTime, 'HH:mm')}
        </div>
      </div>
      <button id="showMenuButton" ref={buttonRef} onClick={toggleMenu}>
        <PencilSimple size={24} weight="fill" className="edit-icon" />
      </button>
    </div>
    )
  }

  return (
    <header className="top-header">
      <div className={mobileDisplaySize ? "mobile-header" : "desktop-header"}>
      <button onClick={navigateToHomePage} className="home-button">
        <img src={logo} id="logo-image" alt="Logo" />
      </button>

      {showMenu && !mobileDisplaySize && (
        dateTimeMenu()
      )}

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
          <div className="location-section">
          <div className="pickup-location-section">
            <label>Pickup</label>
            <div className={`pickup-location ${isPickupTextFieldSelected ? 'selected' : ''}`}
                 ref={pickupTextFieldRef}
                 onMouseEnter={() => setIsPickupTextInputHovered(true)}
                 onMouseLeave={() => setIsPickupTextInputHovered(false)}
                 onClick={() => setIsPickupTextFieldSelected(true)}>
              <MagnifyingGlass size={24} weight="bold" className="search-icon" />
              <input type="text"
                     className="text-input"
                     id="pickup-destination-input-field"
                     placeholder="Pickup location"
              onChange={(e) => setPickupLocationValue(e.target.value)}>
              </input>
              <button className="xCircleButton"
                      onClick={handlePickupXCircleClick}>
                <XCircle className={`cross-icon ${isPickupTextInputHovered && pickupLocationValue !== "" ? 'visible' : ''}`}
                         size={24}
                         weight="bold"/>
              </button>
            </div>
          </div>
          <div className="dropoff-location-section">
            <label>Dropoff</label>
            <div className={`dropoff-location ${isDropoffTextFieldSelected ? 'selected' : ''}`}
                 ref={dropoffTextFieldRef}
                 onMouseEnter={() => setIsDropoffTextInputHovered(true)}
                 onMouseLeave={() => setIsDropoffTextInputHovered(false)}
                 onClick={() => setIsDropoffTextFieldSelected(true)}>
              <MagnifyingGlass size={24} weight="bold" className="search-icon" />
              <input type="text"
                     className="text-input"
                     id="dropoff-destination-input-field"
                     placeholder="Drop-off location"
                     onChange={(e) => setDropoffLocationValue(e.target.value)}>
              </input>
              <button className="xCircleButton" onClick={handleDropoffXCircleClick}>
                <XCircle  className={`cross-icon ${isDropoffTextInputHovered && dropoffLocationValue !== "" ? 'visible' : ''}`}
                  size={24}
                  weight="bold"/>
              </button>
            </div>
          </div>
          </div>
          {mobileDisplaySize && (
            <hr className="mobile-display-divider"></hr>
          )}
          <div className="schedule-and-save-container">
            <div className="schedule-container">
              <div className="pickup-date-section">
                <label>Pickup Date</label>
                <DateTimePicker
                  format={"pickup"}
                  selectedDate={pickupDate}
                  onDateChange={handlePickupDateChange}
                  selectedTime={pickupTime}
                  onTimeChange={handlePickupTimeChange}
                  pickupDate={pickupDate}
                  dropoffDate={dropoffDate}
                  pickupTime={pickupTime}
                  dropoffTime={dropoffTime}
                />
              </div>
              <div className="dropoff-date-section">
                <label>Drop-off Date</label>
                <DateTimePicker
                  format={"dropoff"}
                  selectedDate={dropoffDate}
                  onDateChange={handleDropoffDateChange}
                  selectedTime={dropoffTime}
                  onTimeChange={handleDropoffTimeChange}
                  pickupDate={pickupDate}
                  dropoffDate={dropoffDate}
                  pickupTime={pickupTime}
                  dropoffTime={dropoffTime}
                />
              </div>
            </div>
              {mobileDisplaySize && (
                <hr className="mobile-display-divider"></hr>
              )}
              <button className="save-button" onClick={handleSave}>
                Save Changes
              </button>
          </div>
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
        {showMenu && mobileDisplaySize && (
          dateTimeMenu()
        )}
      </div>
    </header>
  );
};

export default Header;