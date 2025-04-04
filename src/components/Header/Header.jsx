import React, { useState, useRef, useEffect } from 'react';
import LoginButton from '../LoginRegister/Login/Login';
import logo from '../../resources/images/logo.png';
import '../global.css';
import './Header.css';
import { User, PencilSimple } from "@phosphor-icons/react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css"; // Required for analog clock UI
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale/en-GB";

const DateTimePicker = ({ format }) => {
  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [pickUpTime, setpickUpTime] = useState(null);
  const [dropoffTime, setdropoffTime] = useState(null);

  function openTimePicker() {
    timePickerRef.current.showPicker?.(); // Attempt to open the native time picker
  }

  function openDatePicker() {
    datePickerRef.current.showPicker?.(); // react-datepicker method to open it
  }

  return (
    <div className="date-time">
      <div className="date-picker">
        <button className="date-picker-button" onClick={openDatePicker}></button>
        <DatePicker
          ref={datePickerRef}
          selected={format === "pickup" ? pickupDate : dropoffDate} // Possibly buggy
          onChange={(date) => {
            if (format === "pickup") {
              setPickupDate(date)
          } else {
              setDropoffDate(date)
              }
          }}
          monthsShown={2}
          dateFormat="yyyy-MM-dd"
          className="date-input"
          popperClassName="date-picker-popper"
          locale={enGB}
        />
      </div>
      <div className="time-picker">
        <button className="time-picker-button" onClick={openTimePicker}></button>
        <TimePicker
          className="time-input"
          value={format === "pickup" ? pickUpTime : dropoffTime}
          onChange={(time) => {
            if (format === "pickup") {
              setpickUpTime(time)
          } else {
              setdropoffTime(time)
            }
          }}
          disableClock={true} // Set to false for an analog clock
        />
        <input type="time" className="time-input" ref={timePickerRef}/>
      </div>
    </div>
  );
};



const Header = ({ page }) => {
  const showMenu = page === "rental";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSave = () => {
    toggleMenu();
  };

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <header className="top-header">
      <a href="http://localhost:3000/home" className="logoButton">
        <img src={logo} id="logo-image" alt="Logo" />
      </a>

      {showMenu && (
        <div className="top-menu-container">
          <div className="date-time-menu">
            <p>19. March | 12.30 - 05. April | 08.30</p>
          </div>
          <button id="showMenuButton" ref={buttonRef} onClick={toggleMenu}>
            <PencilSimple size={30} className="edit-icon" />
          </button>
        </div>
      )}

      <div className={`date-time-popup-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
        <div className="selection-items">
          <div className="pickup-section">
            <label>Pickup</label>
            <DateTimePicker
              format="pickup"
            />
          </div>
          <div className="dropoff-section">
            <label>Drop-off</label>
            <DateTimePicker
              format="dropoff"
            />
          </div>
          <button className="save-button" onClick={handleSave}>
            Save Changes
          </button>
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
          <User size={32} />
          Login | Register
        </button>
      </nav>
    </header>
  );
};

export default Header;