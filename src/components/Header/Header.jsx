import React, {useEffect, useRef, useState} from 'react';
import LoginButton from '../LoginRegister/Login/Login';
import logo from '../../resources/images/logo.png';
import '../global.css';
import './Header.css';
import {PencilSimple, User, MagnifyingGlass, XCircle, CalendarBlank} from "@phosphor-icons/react";
import DatePicker from "react-datepicker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-datepicker/dist/react-datepicker.css";
import {enGB} from "date-fns/locale/en-GB";
import {format, addDays, subDays, differenceInDays} from 'date-fns';
import { useNavigate } from "react-router-dom";


const Header = ({ page }) => {
  const showMenu = page === "rental";
  const navigate = useNavigate();


  const DateTimePicker = ({ format, selectedDate, onDateChange, pickupDate, dropoffDate }) => {
    const datePickerRef = useRef(null);
    const timePickerRef = useRef(null);
    const [isDatePickerSelected, setIsDatePickerSelected] = useState(false);
    const [isTimePickerSelected, setIsTimePickerSelected] = useState(false);


    const daysOfRental = [];
    const unavailableDays = [];
    const today = new Date();

    for (let i = 1; i < today.getDate() + 7; i++) {
      unavailableDays.push(subDays(today, i));
    }


    const nrOfDaysOfRental = differenceInDays(dropoffDate, pickupDate);
    if (format === "pickup" && dropoffDate !== null && pickupDate !== null) {
      for (let i = 1; i < nrOfDaysOfRental; i++) {
        daysOfRental.push(addDays(pickupDate, i));
      }
    } else if (format === "dropoff" && dropoffDate !== null && pickupDate !== null) {
      for (let i = 1; i < nrOfDaysOfRental; i++) {
        daysOfRental.push(subDays(dropoffDate, i));
      }
    }

    const highlightWithRanges = [
      {
        "react-datepicker__day--highlighted-custom-1": daysOfRental, // highlight days between pickup and dropoff
      },
      {
        "react-datepicker__day--highlighted-custom-2": [
          today // highlight today's date
        ],
      }, {
        "react-datepicker__day--highlighted-custom-3": [pickupDate], // highlight pickup-date with uniquely rounded corners
      }, {
        "react-datepicker__day--highlighted-custom-4": [dropoffDate], // highlight dropoff-date with uniquely rounded corners
      }, {
        "react-datepicker__day--highlighted-custom-5": unavailableDays,
      },
    ];

    function openDatePicker() {
      datePickerRef.current.setOpen(true);
    }



    const generateTimeOptions = () => {
      let timeOptions = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let minute of ['00', '30']) {
          let hourValue = hour.toString().padStart(2, '0');
          let timeValue = `${hourValue}:${minute}`;
          timeOptions.push({label: timeValue, value: timeValue});
        }
      }
      return timeOptions;
    }

    const [timeOptions] = useState({
      pickup: generateTimeOptions(),
      dropoff: generateTimeOptions()
    });

    const [selectedTimes, setSelectedTimes] = useState({
        pickup: "",
        dropoff: "",
      }
    );

    const handleRadioChange = (format, value) => {
      setSelectedTimes(prev => ({
        ...prev,
        [format]: value
      }))
    }

    const renderRadioButton = (format, options) => (
      <div className="time-options">
        {options.map(({value, label}) => (
          <label key={value} className="time-options-label">
            <input
              type="radio"
              name={`${format}-time`}
              checked={selectedTimes[format] === value}
              onChange={() => handleRadioChange(format, value)}/>
            <span>{label}</span>
          </label>
        ))
        }
      </div>
    )


    return (
      <div className="date-time">
        <div className={`date-picker ${isDatePickerSelected ? 'selected' : ''}`}>
          <button className="date-picker-button" onClick={openDatePicker}>
          </button>
          <CalendarBlank weight="bold" className="calendar-icon"/>
          <DatePicker
            ref={datePickerRef}
            onCalendarOpen={() => setIsDatePickerSelected(true)}
            onCalendarClose={() => setIsDatePickerSelected(false)}
            selected={selectedDate}
            onChange={onDateChange}
            highlightDates={highlightWithRanges}
            monthsShown={3}
            dateFormat="d. MMM"
            className="date-input"
            popperClassName="date-picker-popper"
            minDate={today}
            locale={enGB}
          />
        </div>
        <div className={`time-picker ${isTimePickerSelected ? 'selected' : ''}`}>
          <button className="time-picker-button" onClick={() => setIsTimePickerSelected(true)}></button>
          {isTimePickerSelected && (
            <div className="time-picker-radio" ref={timePickerRef}>
              {renderRadioButton(format, timeOptions[format])}
            </div>
          )}
        </div>
      </div>
    );
  };



  const pickupTextFieldRef = useRef(null);
  const dropoffTextFieldRef = useRef(null);
  const [isPickupTextInputHovered, setIsPickupTextInputHovered] = useState(false);
  const [isDropoffTextInputHovered, setIsDropoffTextInputHovered] = useState(false);
  const [isPickupTextFieldSelected, setIsPickupTextFieldSelected] = useState(false);
  const [isDropoffTextFieldSelected, setIsDropoffTextFieldSelected] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [pickupDate, setPickupDate] = useState(() => {
    return new Date();
  });
  const [dropoffDate, setDropoffDate] = useState(() => {
    const time = new Date();
    time.setDate(time.getDate()+100);
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

  const handlePickupDateChange = (date) => {
    if (date.getTime() > dropoffDate.getTime()) {
      setDropoffDate(date);
      setPickupDate(null);
    } else {
      setPickupDate(date);
    }
  }

  const handleDropoffDateChange = (date) => {
    if (pickupDate.getTime() > date.getTime()) {
      setPickupDate(date);
      setDropoffDate(null);
    } else {
      setDropoffDate(date);
    }
  }

  function handlePickupXCircleClick() {
    const inputField = document.getElementById("pickup-destination-input-field");
    inputField.value = "";
    inputField.focus();
  }


  function handleDropoffXCircleClick() {
    const inputField = document.getElementById("dropoff-destination-input-field");
    inputField.value = "";
    inputField.focus();
  }


  const navigateToHomePage = () => {
    navigate('/home');
  }

  // event listeners

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


  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const showModal = () => setIsModalVisible(true);

  const closeModal = () => setIsModalVisible(false);

  const handleSave = () => {
    toggleMenu();
  };

  return (
    <header className="top-header">
      <div className="header-wrapper">
      <button onClick={navigateToHomePage} className="home-button">
        <img src={logo} id="logo-image" alt="Logo" />
      </button>

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
            <PencilSimple size={24} weight="fill" className="edit-icon" />
          </button>
        </div>
      )}

      <div className={`date-time-popup-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
        <div className="selection-items">
          <div className="pickup-destination-section">
            <label>Pickup</label>
            <div className={`pickup-destination ${isPickupTextFieldSelected ? 'selected' : ''}`}
                 ref={pickupTextFieldRef}
                 onMouseEnter={() => setIsPickupTextInputHovered(true)}
                 onMouseLeave={() => setIsPickupTextInputHovered(false)}
                 onClick={() => setIsPickupTextFieldSelected(true)}>
              <MagnifyingGlass size={24} weight="bold" className="search-icon" />
              <input type="text"
                     className="text-input"
                     id="pickup-destination-input-field"
                     placeholder="Pickup location">
              </input>
              <button className="xCircleButton"
                      onClick={handlePickupXCircleClick}>
                <XCircle className={`cross-icon ${isPickupTextInputHovered ? 'visible' : ''}`}
                         size={24}
                         weight="bold"/>
              </button>
            </div>
          </div>
          <div className="dropoff-destination-section">
            <label>Dropoff</label>
            <div className={`dropoff-destination ${isDropoffTextFieldSelected ? 'selected' : ''}`}
                 ref={dropoffTextFieldRef}
                 onMouseEnter={() => setIsDropoffTextInputHovered(true)}
                 onMouseLeave={() => setIsDropoffTextInputHovered(false)}
                 onClick={() => setIsDropoffTextFieldSelected(true)}>
              <MagnifyingGlass size={24} weight="bold" className="search-icon" />
              <input type="text"
                     className="text-input"
                     id="dropoff-destination-input-field"
                     placeholder="Drop-off location">
              </input>
              <button className="xCircleButton" onClick={handleDropoffXCircleClick}>
                <XCircle  className={`cross-icon ${isDropoffTextInputHovered ? 'visible' : ''}`}
                  size={24}
                  weight="bold"/>
              </button>
            </div>
          </div>
          <div className="pickup-date-section">
            <label>Pickup Date</label>
            <DateTimePicker
              format={"pickup"}
              selectedDate={pickupDate}
              onDateChange={handlePickupDateChange}
              selectedTime={pickupTime}
              onTimeChange={setPickUpTime}
              pickupDate={pickupDate}
              dropoffDate={dropoffDate}
            />
          </div>
          <div className="dropoff-date-section">
            <label>Drop-off Date</label>
            <DateTimePicker
              format={"dropoff"}
              selectedDate={dropoffDate}
              onDateChange={handleDropoffDateChange}
              selectedTime={dropoffTime}
              onTimeChange={setDropoffTime}
              pickupDate={pickupDate}
              dropoffDate={dropoffDate}
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
          <User size={24} className="user-logo" />
          Login | Register
        </button>
      </nav>
      </div>
    </header>
  );
};

export default Header;