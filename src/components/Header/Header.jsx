import React, {useEffect, useRef, useState} from 'react';
import LoginButton from '../LoginRegister/Login/Login';
import logo from '../../resources/images/logo.png';
import '../global.css';
import './Header.css';
import {PencilSimple, User} from "@phosphor-icons/react";
import DatePicker from "react-datepicker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-datepicker/dist/react-datepicker.css";
import {enGB} from "date-fns/locale/en-GB";
import { format } from 'date-fns';

const DateTimePicker = ({ selectedDate, onDateChange, selectedTime, onTimeChange }) => {
  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);
  const [isDatePickerSelected, setIsDatePickerSelected] = useState(false);
  const [isTimePickerSelected, setIsTimePickerSelected] = useState(false);



  function openTimePicker() {
    if (timePickerRef.current) {
      timePickerRef.current.setOpen(true);
    }
  }

  function openDatePicker() {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }  }

  return (
    <div className="date-time">
      <div className={`date-picker ${isDatePickerSelected ? 'selected' : ''}`}>
        <button className="date-picker-button" onClick={openDatePicker}></button>
        <DatePicker
          ref={datePickerRef}
          onCalendarOpen={() => setIsDatePickerSelected(true)}
          onCalendarClose={() => setIsDatePickerSelected(false)}
          selected={selectedDate}
          onChange={onDateChange}
          monthsShown={2}
          dateFormat="dd-MM"
          className="date-input"
          popperClassName="date-picker-popper"
          locale={enGB}
        />
      </div>
      <div className={`time-picker ${isTimePickerSelected ? 'selected' : ''}`}>
        <button className="time-picker-button" onClick={openTimePicker}></button>
        <DatePicker
          ref={timePickerRef}
          selected={selectedTime}
          onChange={onTimeChange}
          onCalendarOpen={() => setIsTimePickerSelected(true)}
          onCalendarClose={() => setIsTimePickerSelected(false)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={30}
          timeCaption="Time"
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          className="time-input"
        />
      </div>
    </div>
  );
};



const Header = ({ page }) => {
  const showMenu = page === "rental";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickupDate, setPickupDate] = useState(() => {
    return new Date();
  });
  const [dropoffDate, setDropoffDate] = useState(() => {
    const time = new Date();
    time.setDate(time.getDate()+1);
    return time;
  });
  const [pickupTime, setPickUpTime] = useState(() => {
    const time = new Date();
    time.setHours(time.getHours()+1);
    time.setMinutes(0);
    return time;
  });
  const [dropoffTime, setDropoffTime] = useState(() => {
    const time = new Date();
    time.setHours(time.getHours()+1);
    time.setMinutes(0);
    return time;
  });
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
            <p className="date-range-display">
              {format(pickupDate, 'MMM d')} | {format(pickupTime, 'h:mm a')}
              <span className="separator"> - </span>
              {format(dropoffDate, 'MMM d')} | {format(dropoffTime, 'h:mm a')}
            </p>
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
              selectedDate={pickupDate}
              onDateChange={setPickupDate}
              selectedTime={pickupTime}
              onTimeChange={setPickUpTime}
            />
          </div>
          <div className="dropoff-section">
            <label>Drop-off</label>
            <DateTimePicker
              selectedDate={dropoffDate}
              onDateChange={setDropoffDate}
              selectedTime={dropoffTime}
              onTimeChange={setDropoffTime}
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