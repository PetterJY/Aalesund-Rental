import React, {useRef, useState, useEffect, useContext} from 'react';
import { MagnifyingGlass, XCircle, X } from "@phosphor-icons/react";
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import DropDownSuggestions from './DropDownSuggestions/DropDownSuggestions';
import { BookingContext } from '../../utils/BookingContext'
import './BookingForm.css'; 
import '../../App.css';
import {useNavigate} from "react-router-dom";

const BookingForm = ({
                       initialData,
                       onSave,
                       mobileDisplaySize = false,
                       onClose = null,
                       showCloseButton = false
                     }) => {

  const {bookingData, setBookingData} = useContext(BookingContext);

  const pickupTextFieldRef = useRef(null);
  const dropoffTextFieldRef = useRef(null);

  const [pickupLocationValue, setPickupLocationValue] = useState(bookingData.pickupLocation || "");
  const [dropoffLocationValue, setDropoffLocationValue] = useState(bookingData.dropoffLocation || "");

  const [isPickupTextInputHovered, setIsPickupTextInputHovered] = useState(false);
  const [isDropoffTextInputHovered, setIsDropoffTextInputHovered] = useState(false);
  const [isPickupTextFieldSelected, setIsPickupTextFieldSelected] = useState(false);
  const [isDropoffTextFieldSelected, setIsDropoffTextFieldSelected] = useState(false);

  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  const [pickupLocations, setPickupLocations] = useState([]);
  const [showPickupLocationSuggestions, setShowPickupLocationSuggestions] = useState(false);

  const [dropoffLocations, setDropoffLocations] = useState([]);
  const [showDropoffLocationSuggestions, setShowDropoffLocationSuggestions] = useState(false);

  async function fetchLocations() {
    setIsLoadingLocations(true);
    try {
      const response = await fetch(`http://localhost:8080/cars/locations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
      });
      if (!response.ok) {
        console.error('Failed to fetch pickup locations:', response.statusText);
        return;
      }
      const data = await response.json();
      setPickupLocations(data);
      setDropoffLocations(data);
      console.log('Fetched pickup locations:', data);
    } catch (error) {
      console.error('Error fetching pickup locations:', error);
    } finally {
      setIsLoadingLocations(false);
    }
  }
  
  useEffect(() => {
    fetchLocations();
  }, []);

  const [pickupDate, setPickupDate] = useState(() => {
    const time = new Date();
    time.setDate(time.getDate()+1)
    return initialData.pickupDate || time;
  });

  const [dropoffDate, setDropoffDate] = useState(() => {
    const time = new Date();
    time.setDate(time.getDate()+13);
    return initialData.dropoffDate || time;
  });

  const [pickupTime, setPickUpTime] = useState(() => {
    const time = new Date();
    time.setHours(time.getHours()+1);
    time.setMinutes(0);
    return initialData.pickupTime || time;
  });

  const [dropoffTime, setDropoffTime] = useState(() => {
    const time = new Date();
    time.setHours(time.getHours()+1);
    time.setMinutes(0);
    return initialData.dropoffTime || time;
  });

  useEffect(() => {
    const pickupDateTemp = new Date(new Date().setDate(new Date().getDate() + 1));
    const dropOffDateTemp = new Date(new Date().setDate(new Date().getDate() + 13));
    const pickupTimeTemp = new Date(new Date().setHours(new Date().getHours() + 1, 0));
    const dropoffTimeTemp = new Date(new Date().setHours(new Date().getHours() + 2, 0));

    setPickupLocationValue(initialData.pickupLocation || "");
    setDropoffLocationValue(initialData.dropoffLocation || "");

    setPickupDate(initialData.pickupDate || pickupDateTemp);
    setDropoffDate(initialData.dropoffDate || dropOffDateTemp);
    setPickUpTime(initialData.pickupTime || pickupTimeTemp);
    setDropoffTime(initialData.dropoffTime || dropoffTimeTemp);
  }, [initialData]);

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
    setDropoffTime(newTime);
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
    setShowPickupLocationSuggestions(true);
  }

  function handleDropoffXCircleClick() {
    const inputField = document.getElementById("dropoff-destination-input-field");
    inputField.value = "";
    inputField.focus();
    setDropoffLocationValue("");
    setShowDropoffLocationSuggestions(true);
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
    onSave();
    setBookingData({
      ...bookingData,
      pickupLocation: pickupLocationValue,
      dropoffLocation: dropoffLocationValue,
      pickupDate,
      dropoffDate,
      pickupTime,
      dropoffTime
    });
  };

  useEffect(() => {
    if (isPickupTextFieldSelected) {
      setShowPickupLocationSuggestions(true);
    } else {
      setShowPickupLocationSuggestions(false);
    }
  }, [isPickupTextFieldSelected]);

  useEffect(() => {
    if (isDropoffTextFieldSelected) {
      setShowDropoffLocationSuggestions(true);
    } else {
      setShowDropoffLocationSuggestions(false);
    }
  }, [isDropoffTextFieldSelected]);

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
            <input 
              type="text"
              className="text-input"
              id="pickup-destination-input-field"
              placeholder="Pickup location"
              value={pickupLocationValue}
              onChange={(e) => {
                setPickupLocationValue(e.target.value)
                if (isPickupTextFieldSelected) {
                  setShowPickupLocationSuggestions(true);
                } else {
                  setShowPickupLocationSuggestions(false);
                }
              }}
            />

            {showPickupLocationSuggestions && !isLoadingLocations && (
              <DropDownSuggestions
                locations={
                  pickupLocations.filter(loc =>
                  loc.toLowerCase().includes(pickupLocationValue.toLowerCase())
                )}
                setLocationSuggestions={setPickupLocations}
                setLocationValue={setPickupLocationValue}
                setShowSuggestions={setShowPickupLocationSuggestions}
              />
            )}

            <button className="xCircleButton"
                    onClick={handlePickupXCircleClick}>
              <XCircle className={`cross-icon ${isPickupTextInputHovered && pickupLocationValue !== "" ? 'visible' : ''}`}
                       size={24}
                       weight="bold"/>
            </button>
          </div>
        </div>
        <div className="dropoff-location-section">
          <label>Drop-off</label>
          <div className={`dropoff-location ${isDropoffTextFieldSelected ? 'selected' : ''}`}
              ref={dropoffTextFieldRef}
              onMouseEnter={() => setIsDropoffTextInputHovered(true)}
              onMouseLeave={() => setIsDropoffTextInputHovered(false)}
              onClick={() => setIsDropoffTextFieldSelected(true)}>
            <MagnifyingGlass size={24} weight="bold" className="search-icon" />
            <input
              type="text"
              className="text-input"
              id="dropoff-destination-input-field"
              placeholder="+ Other drop-off location"
              value={dropoffLocationValue}
              onChange={(e) => {
                setDropoffLocationValue(e.target.value);
                if (e.target.value.length > 0) {
                  setShowDropoffLocationSuggestions(true);
                } else {
                  setShowDropoffLocationSuggestions(false);
                }
              }}
            />

            {showDropoffLocationSuggestions && !isLoadingLocations && (
              <DropDownSuggestions
                locations={
                  dropoffLocations.filter(loc =>
                  loc.toLowerCase().includes(dropoffLocationValue.toLowerCase())
                )}
                setLocationSuggestions={setDropoffLocations}
                setLocationValue={setDropoffLocationValue}
                setShowSuggestions={setShowDropoffLocationSuggestions}
              />
            )}

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