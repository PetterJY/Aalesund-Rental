import React, { useState, useRef, useEffect } from 'react';
import LoginButton from '../LoginRegister/Login/Login';
import logo from '../../resources/images/logo.png';
import '../global.css';
import './Header.css';
import { User, PencilSimple } from "@phosphor-icons/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {enGB} from "date-fns/locale/en-GB";

const Header = ({ page }) => {
  const showMenu = page === "rental";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);

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

  const handleSave = () => {
    console.log("Pickup Date:", pickupDate);
    console.log("Dropoff Date:", dropoffDate);
    toggleMenu();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
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
        <div className="pickup-section">
          <label>Pickup</label>
          <div className="date-time-inputs">
            <DatePicker
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              monthsShown={3}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select pickup date"
              className="date-input"
              popperClassName="date-picker-popper"
              locale={enGB}
            />
            <input type="time" className="time-input" />
          </div>
        </div>
        <div className="dropoff-section">
          <label>Drop-off</label>
          <div className="date-time-inputs">
            <DatePicker
              selected={dropoffDate}
              onChange={(date) => setDropoffDate(date)}
              monthsShown={3}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select dropoff date"
              className="date-input"
              popperClassName="date-picker-popper"
              locale={enGB}
            />
            <input type="time" className="time-input" />
          </div>
        </div>
        <button className="save-button" onClick={handleSave}>Save Changes</button>
      </div>

      <nav className="nav-bar">
        <LoginButton showModal={showModal} closeModal={closeModal} isModalVisible={isModalVisible} defaultMode="login" />
        <button id="login-create" onClick={showModal}>
          <User size={32} />
          Login | Register
        </button>
      </nav>
    </header>
  );
};

export default Header;