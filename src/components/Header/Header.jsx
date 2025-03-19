import React, { useState, useRef, useEffect } from 'react';
import LoginButton from '../LoginRegister/Login/Login';
import logo from '../../resources/images/logo.png';
import '../global.css';
import './Header.css';
import { User, PencilSimple} from "@phosphor-icons/react";

const Header = ({page}) => {
  const showMenu = page === "rental";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleSave = () => {
    // Save the date/time values to state or context
    // You could extract values from your input fields here

    // Then close the menu
    toggleMenu();
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  // TODO: Fix link
  return (
    <header className="top-header">
      <a href="http://localhost:3000/home" className="logoButton">
        <img src={logo} id="logo-image" alt="Logo" />
      </a>

      {showMenu && (
        <div className="top-menu-container">
          <div className="date-time-menu">
            <p>
              19. March | 12.30 - 05. April | 08.30
            </p>
          </div>
          <button id="showMenuButton" ref={buttonRef} onClick={toggleMenu}>
            <PencilSimple size={30} className="edit-icon"/>
          </button>
        </div>
      )}

      <div className={`date-time-popup-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
        <div className="popup-section">
          <h3>Pickup Date & Time</h3>
          <div className="date-time-inputs">
            <input type="date" className="date-input" />
            <input type="time" className="time-input" />
          </div>
        </div>
        <div className="popup-section">
          <h3>Drop-off Date & Time</h3>
          <div className="date-time-inputs">
            <input type="date" className="date-input" />
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