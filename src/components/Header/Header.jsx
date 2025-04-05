import React, {useEffect, useRef, useState} from 'react';
import LoginButton from '../LoginRegister/Login/Login';
import logo from '../../resources/images/logo.png';
import '../global.css';
import './Header.css';
import {PencilSimple, User, MagnifyingGlass, XCircle} from "@phosphor-icons/react";
import DatePicker from "react-datepicker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-datepicker/dist/react-datepicker.css";
import {enGB} from "date-fns/locale/en-GB";
import {format, addDays, subDays, differenceInDays} from 'date-fns';
const DateTimePicker = ({ format, selectedDate, onDateChange, selectedTime, onTimeChange, pickupDate, dropoffDate }) => {
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

  function openTimePicker() {
    if (timePickerRef.current) {
      timePickerRef.current.setOpen(true);
    }
  }

  function openDatePicker() {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  }

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
            highlightDates={highlightWithRanges}
            monthsShown={3}
            dateFormat="dd-MM"
            className="date-input"
            popperClassName="date-picker-popper"
            minDate={today}
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

  function handleXCircleClick() {

  }



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
  const showModal = () => setIsModalVisible(true);

  const closeModal = () => setIsModalVisible(false);

  const handleSave = () => {
    toggleMenu();
  };

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
            <PencilSimple size={24} className="edit-icon" />
          </button>
        </div>
      )}

      <div className={`date-time-popup-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
        <div className="selection-items">
          <div className="pickup-destination-section">
            <label>Pickup</label>
            <div className="pickup-destination">
              <MagnifyingGlass size={24} weight="bold" className="search-icon" />
              <input type="text" className="text-input"></input>
              <button className="xCircleButton" onClick={handleXCircleClick}>
                <XCircle size={24} weight="bold" className="cross-icon"/>
              </button>
            </div>
          </div>
          <div className="dropoff-destination-section">
            <label>Dropoff</label>
            <div className="dropoff-destination">
              <MagnifyingGlass size={24} weight="bold" className="search-icon" />
              <input type="text" className="text-input"></input>
              <XCircle size={24} weight="bold" className="cross-icon"/>
            </div>
          </div>
          <div className="pickup-date-section">
            <label>Pickup Date</label>
            <DateTimePicker
              format={"pickup"}
              selectedDate={pickupDate}
              onDateChange={asdhandlePickupDateChange}
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
          <User size={32} />
          Login | Register
        </button>
      </nav>
    </header>
  );
};

export default Header;