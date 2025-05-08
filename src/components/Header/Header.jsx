import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, X, PencilSimple, Car, UserCircleCheck } from '@phosphor-icons/react';
import { format } from 'date-fns';
import { getAccountId, getRole } from '../utils/JwtUtility';
import logo from '../../resources/images/logo.png';
import LoginButton from '../LoginRegister/Login/Login';
import BookingForm from '../Home/BookingForm/BookingForm';
import DropDownMenu from './DropDownMenu/DropDownMenu';
import './Header.css';
import '../App.css';

const Header = () => {
  const showMenu = useLocation().pathname === "/rental";
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mobileDisplaySize, setMobileDisplaySize] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const [userIcon, setUserIcon] = useState();
  const [userDisplayName, setUserDisplayName] = useState();

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

  async function fetchAccountDetails() {
    const accountId = getAccountId();
    
    const response = await fetch(`http://localhost:8080/accounts/${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const accountDetails = await fetchAccountDetails();
        switch (accountDetails.role) {
          case 'ROLE_ADMIN':
            setUserIcon(<UserCircleCheck size={24} className="user-icon" />);
            setUserDisplayName(`${accountDetails.name}`);            
            break;
          case 'ROLE_PROVIDER':
            setUserIcon(<Car size={24} className="user-icon" />);
            setUserDisplayName(accountDetails.companyName);            
            break;
          case 'ROLE_USER':
            setUserIcon(<User size={24} className="user-icon" />);
            setUserDisplayName(`${accountDetails.firstName} ${accountDetails.lastName}`);            
            break;
          default:
            setUserIcon(<User size={24} className="user-icon" />);
            setUserDisplayName('Guest');
        }
      } catch (error) {
        setUserIcon(<User size={24} className="user-icon" />);
        setUserDisplayName('Login | Register');
      }
    };
  
    fetchDetails(); 
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdownMenu = () => {
    setIsDropdownVisible((prev) => {
      console.log("Toggling dropdown menu, new state:", !prev);
      return !prev;
    });
  };
  
  const handleUserClick = () => {
    console.log("HandleUserClick, isLoggedIn value: " + isLoggedIn);
    if (isLoggedIn) {
      toggleDropdownMenu();
    } else {
      setIsModalVisible(true);
    }
  };

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setIsDropdownVisible(false);
    navigate('/home');
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
            closeModal={closeModal}
            isModalVisible={isModalVisible}
            setIsLoggedIn={setIsLoggedIn}
            defaultMode="login"
          />

          <button id="login-create" onClick={handleUserClick}>
            {userIcon}
            {!isLoggedIn && <span className="login-register-text">Login | Register</span>}
            {isLoggedIn && <span id="logged-in-text" className="login-register-text">{userDisplayName}</span>}
          </button>
          {isDropdownVisible && (
            <DropDownMenu
              isDropdownVisible={isDropdownVisible}
              navigate={navigate}
              handleLogout={handleLogout}
            />
          )}
        </nav>

        {showMenu && mobileDisplaySize && <DateTimeMenu />}
      </div>
    </header>
  );
};

export default Header;