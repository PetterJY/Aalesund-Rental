import React, { useRef, useState, useEffect } from 'react';
import { MagnifyingGlass, XCircle, X } from "@phosphor-icons/react";
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import './BookingForm.css'; // You'll need to copy relevant CSS from Header.css

const BookingForm = ({
                       onSave,
                       mobileDisplaySize = false,
                       onClose = null,
                       showCloseButton = false
                     }) => {
  const pickupTextFieldRef = useRef(null);
  const dropoffTextFieldRef = useRef(null);
  const [pickupLocationValue, setPickupLocationValue] = useState("");
  const [dropoffLocationValue, setDropoffLocationValue] = useState("");
  const [isPickupTextInputHovered, setIsPickupTextInputHovered] = useState(false);
  const [isDropoffTextInputHovered, setIsDropoffTextInputHovered] = useState(false);
  const [isPickupTextFieldSelected, setIsPickupTextFieldSelected] = useState(false);
  const [isDropoffTextFieldSelected, setIsDropoffTextFieldSelected] = useState(false);

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
    setPickUpTime(newTime);
  }

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

  const handleSave = () => {
    onSave({
      pickupLocation: pickupLocationValue,
      dropoffLocation: dropoffLocationValue,
      pickupDate,
      dropoffDate,
      pickupTime,
      dropoffTime
    });
  };

  return (
    <div className="menu-wrapper">
      {showCloseButton && mobileDisplaySize && (
        <div className="mobile-display-top-menu">
          <button className="x-button">
            <X className="x-icon" size={24} weight="bold" onClick={onClose}/>
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
                  value={pickupLocationValue}
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
              value={dropoffLocationValue}
              onChange={(e) => setDropoffLocationValue(e.target.value)}>
            </input>
            <button className="xCircleButton" onClick={handleDropoffXCircleClick}>
              <XCircle className={`cross-icon ${isDropoffTextInputHovered && dropoffLocationValue !== "" ? 'visible' : ''}`}
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
          Search Cars
        </button>
      </div>
    </div>
  );
};

export default BookingForm;