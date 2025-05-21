import React, {useState, useEffect, useRef, useContext} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, X, PencilSimple, Car, UserCircleCheck } from '@phosphor-icons/react';
import { getAccountId } from '../utils/JwtUtility';
import { useAuth } from '../utils/AuthContext';
import { format } from 'date-fns';
import logo from '../../resources/images/logo.png';
import LoginButton from '../LoginRegister/Login/Login';
import BookingForm from '../Home/BookingForm/BookingForm';
import HeaderDropDownMenuMenu from './HeaderDropDownMenu/HeaderDropDownMenuMenu';
import './Header.css';
import {BookingContext} from "../utils/BookingContext";

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

  const { bookingData } = useContext(BookingContext);
  
  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 1500) {
        setMobileDisplaySize(false);
      } else if (window.innerWidth > 700) {
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
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [isMenuOpen]);

  const navigateToHomePage = () => {
    navigate('/home');
  };

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleSaveBooking = () => {
    toggleMenu();
  };

  const DateTimeMenu = () => {
    return (
      <div className={mobileDisplaySize ? "date-time-menu-mobile" : "date-time-menu-desktop"}>
        <div className="date-range-display">
          <div className="location-display">
            {bookingData.pickupLocation || "OSLO"} <span className={`separator ${bookingData.dropoffLocation ? '' : 'hidden'}`}> - </span> {bookingData.dropoffLocation || ""}
          </div>
          <div className="time-display">
            {format(bookingData.pickupDate, 'd. MMM')} <span className="separator"> | </span> {format(bookingData.pickupTime, 'HH:mm')}
            <span className="separator"> - </span>
            {format(bookingData.dropoffDate, 'd. MMM')} <span className="separator"> | </span> {format(bookingData.dropoffTime, 'HH:mm')}
          </div>
        </div>
        <button id="showMenuButton" ref={buttonRef} onClick={toggleMenu} aria-label="Edit booking details">
          <PencilSimple size={24} weight="fill" className="edit-icon" />
        </button>
      </div>
    );
  };

  async function fetchAccountDetails() {
    
    const accountId = getAccountId();
    
    if (!accountId) { 
      return null;
    }
    
    const response = await fetch(`http://localhost:8080/accounts/${accountId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }

  const { isAuthenticated, setIsAuthenticated, setIsAuthInitialized } = useAuth();

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
  }, [isAuthenticated]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsAuthenticated(true);
      setIsAuthInitialized(true);
    } else {
      setIsAuthenticated(false);
      setIsAuthInitialized(true);
    }
  }, []);


  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdownMenu = () => {
    setIsDropdownVisible((prev) => {
      const newState = !prev;
      return newState;
    });
  };

  const handleUserClick = () => {
    if (isAuthenticated) {
      toggleDropdownMenu();
    } else {
      setIsModalVisible(true);
    }
  };

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setIsDropdownVisible(false);
    navigate('/home');
  }; 

  const handleXClick = () => setIsMenuOpen(false);
  const closeModal = () => setIsModalVisible(false);

  return (
    <header className="top-header">
      <div className={mobileDisplaySize ? "mobile-header" : "desktop-header"}>
        <button onClick={navigateToHomePage} className="home-button" aria-label="Go to home page">
          <img src={logo} id="logo-image" alt="Logo" />
        </button>

        {showMenu && !mobileDisplaySize && <DateTimeMenu />}
        {isMenuOpen && (
          <div className="backdrop" onClick={() => setIsMenuOpen(false)}></div>
        )}

        <div className={`date-time-popup-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
          <div className="menu-wrapper">
            {/*{mobileDisplaySize && (*/}
            {/*  <div className="mobile-display-top-menu">*/}
            {/*    <button className="x-button">*/}
            {/*      <X className="x-icon" size={24} weight="bold" onClick={handleXClick}/>*/}
            {/*    </button>*/}
            {/*    <h2 className="booking-details-title">Your booking details</h2>*/}
            {/*  </div>*/}
            {/*)}*/}

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
            defaultMode="login"
          />

          <button id="login-create" 
            onMouseDown={(event) => {
              event.stopPropagation();
              handleUserClick()
            }}
            aria-label={isAuthenticated ? "Open user menu" : "Login or register"}
          >
            {userIcon}
            {!isAuthenticated && <span className="login-register-text">Login | Register</span>}
            {isAuthenticated && <span id="logged-in-text" className="login-register-text">{userDisplayName}</span>}
          </button>
            <HeaderDropDownMenuMenu
              toggleDropdownMenu={toggleDropdownMenu}
              isDropdownVisible={isDropdownVisible}
              navigate={navigate}
              handleLogout={handleLogout}
            />
        </nav>
        {showMenu && mobileDisplaySize && <DateTimeMenu />}
      </div>
    </header>
  );
};

export default Header;