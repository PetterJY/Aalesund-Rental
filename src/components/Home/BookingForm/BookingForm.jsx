import React, {useRef, useState, useEffect, useContext} from 'react';
import { MagnifyingGlass, XCircle, X } from "@phosphor-icons/react";
import DateTimePicker from '../DateTimePicker/DateTimePicker';
import DropDownLocationSuggestions from './DropDownLocationSuggestions/DropDownLocationSuggestions';
import { BookingContext } from '../../utils/BookingContext'
import './BookingForm.css';

const BookingForm = ({
                       initialData,
                       onSave,
                       mobileDisplaySize = false,
                       showCloseButton = false
                     }) => {

  const {bookingData, setBookingData} = useContext(BookingContext);

  const pickupTextFieldRef = useRef(null);
  const dropoffTextFieldRef = useRef(null);

  const pickupDestinationInputFieldRef = useRef(null);
  const dropoffDestinationInputFieldRef = useRef(null);

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

  const [isPickupFieldValid, setIsPickupFieldValid] = useState(true);

  const [showFullScreenForm, setShowFullScreenForm] = useState(false);
  const [showDatePickerOnMobile, setShowDatePickerOnMobile] = useState(false);

  const [formZIndex, setFormZIndex] = useState(0);

  async function fetchLocations() {
    setIsLoadingLocations(true);
    try {
      const response = await fetch(`https://norwegian-rental.online/api/cars/locations`, {
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
    time.setDate(time.getDate() + 1)
    return initialData.pickupDate || time;
  });

  const [dropoffDate, setDropoffDate] = useState(() => {
    const time = new Date();
    time.setDate(time.getDate() + 13);
    return initialData.dropoffDate || time;
  });

  const [pickupTime, setPickUpTime] = useState(() => {
    const time = new Date();
    time.setHours(time.getHours() + 1);
    time.setMinutes(0);
    return initialData.pickupTime || time;
  });

  const [dropoffTime, setDropoffTime] = useState(() => {
    const time = new Date();
    time.setHours(time.getHours() + 1);
    time.setMinutes(0);
    return initialData.dropoffTime || time;
  });

  useEffect(() => {
    const pickupDateTemp = new Date(new Date().setDate(new Date().getDate() + 1));
    const dropOffDateTemp = new Date(new Date().setDate(new Date().getDate() + 13));
    const pickupTimeTemp = new Date(new Date().setHours(12, 0));
    const dropoffTimeTemp = new Date(new Date().setHours(12, 0));

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
    pickupDestinationInputFieldRef.current.focus();
    pickupDestinationInputFieldRef.current.value = "";
    setPickupLocationValue("");
    setShowPickupLocationSuggestions(true);
    setIsPickupFieldValid(true);
  }

  function handleDropoffXCircleClick() {
    dropoffDestinationInputFieldRef.current.focus();
    dropoffDestinationInputFieldRef.current.value = "";
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropoffTextFieldSelected]);

  useEffect(() => {
    if (!pickupLocationValue && pickupLocations && pickupLocations.length > 0) {
      setPickupLocationValue(pickupLocations[0]); // Set the default to the first suggestion
    }
  }, [setPickupLocationValue, pickupLocations]);

  const handleSave = () => {
    if (!pickupLocationValue.trim() || !pickupLocations.includes(pickupLocationValue)) {
      setIsPickupFieldValid(false);
      return;
    }
    setIsPickupFieldValid(true);

    onSave();

    console.log("Pre Booking data:", bookingData);

    setBookingData({
      ...bookingData,
      pickupLocation: pickupLocationValue,
      dropoffLocation: dropoffLocationValue,
      pickupDate,
      dropoffDate,
      pickupTime,
      dropoffTime
    });

    console.log("Post Booking data:", bookingData);
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



  const handleShowMenu = () => {
    setShowFullScreenForm(true);
    setFormZIndex(1000);
  };

  const closeFullScreenForm = () => {
    setShowFullScreenForm(false);
    setFormZIndex(0);
  };

  const pickupLocationSection = () => {
    return (
      <div className="pickup-location-section">
        <label>Pickup</label>
        <div className={`pickup-location ${isPickupTextFieldSelected ? 'selected' : ''} 
              ${(!isPickupFieldValid && !isPickupTextFieldSelected) ? 'error' : ''} `}
             ref={pickupTextFieldRef}
             onMouseEnter={() => setIsPickupTextInputHovered(true)}
             onMouseLeave={() => setIsPickupTextInputHovered(false)}
             onClick={() => setIsPickupTextFieldSelected(true)}>
          <MagnifyingGlass size={24} weight="bold" className="search-icon"/>
          <input
            type="text"
            className="text-input"
            required={true}
            ref={pickupDestinationInputFieldRef}
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
            <DropDownLocationSuggestions
              locations={
                pickupLocations.filter(loc =>
                  loc.toLowerCase().includes(pickupLocationValue.toLowerCase())
                )}
              setLocationSuggestions={setPickupLocations}
              setLocationValue={setPickupLocationValue}
              setShowSuggestions={setShowPickupLocationSuggestions}
              setIsPickupFieldValid={setIsPickupFieldValid}
            />
          )}

          <button className="xCircleButton"
                  onClick={handlePickupXCircleClick}
                  aria-label="Clear pickup location">
            <XCircle
              className={`cross-icon ${isPickupTextInputHovered && pickupLocationValue !== "" ? 'visible' : ''}`}
              size={24}
              weight="bold"/>
          </button>
        </div>
        {!isPickupFieldValid && <p className="error-message">Pickup location is required.</p>}
      </div>
    )
  }

  const mobileDisplayForm = () => {
    return (
    <div className="mobile-display-form" style={{ zIndex: formZIndex }}>
      {showFullScreenForm && mobileEntireBookingForm()}
      {pickupLocationSection()}
      <button className="save-button" onClick={handleShowMenu} aria-label="Select Pickup Location">
        Select Pickup Location
      </button>
    </div>
    )
  }

  const mobileEntireBookingForm = () => {
    return (
      <div className="mobile-menu-wrapper">
        <div className="mobile-display-top-menu">
          <button className="x-button" onClick={closeFullScreenForm} aria-label="Close booking form">
            <X className="x-icon" id="mobile-datepicker-closing-button" size={24} weight="bold"/>
          </button>
          <h2 className="booking-details-title">Your booking details</h2>
        </div>
        {entireBookingForm()}
      </div>
    )
  }

  const handleCalendarOpen = () => {
    if (mobileDisplaySize) {
      setShowDatePickerOnMobile(true);
    }
  }


  const entireBookingForm = () => {
    return (
    <div className="menu-wrapper" style={{ zIndex: formZIndex }}>
        <div className="location-section">
          {pickupLocationSection()}
          <div className="dropoff-location-section">
            <label>Drop-off</label>
            <div className={`dropoff-location ${isDropoffTextFieldSelected ? 'selected' : ''}`}
                 ref={dropoffTextFieldRef}
                 onMouseEnter={() => setIsDropoffTextInputHovered(true)}
                 onMouseLeave={() => setIsDropoffTextInputHovered(false)}
                 onClick={() => setIsDropoffTextFieldSelected(true)}>
              <MagnifyingGlass size={24} weight="bold" className="search-icon"/>
              <input
                type="text"
                className="text-input"
                id="dropoff-destination-input-field"
                placeholder="Dropoff location"
                value={dropoffLocationValue}
                ref={dropoffDestinationInputFieldRef}
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
                <DropDownLocationSuggestions
                  locations={
                    dropoffLocations.filter(loc =>
                      loc.toLowerCase().includes(dropoffLocationValue.toLowerCase())
                    )}
                  setLocationSuggestions={setDropoffLocations}
                  setLocationValue={setDropoffLocationValue}
                  setShowSuggestions={setShowDropoffLocationSuggestions}
                />
              )}

              <button className="xCircleButton" onClick={handleDropoffXCircleClick} aria-label="Clear dropoff location">
                <XCircle
                  className={`cross-icon ${isDropoffTextInputHovered && dropoffLocationValue !== "" ? 'visible' : ''}`}
                  size={24}
                  weight="bold"/>
              </button>
            </div>
          </div>
          {mobileDisplaySize && (<div className="mobile-display-divider"></div>)}
        </div>
        <div className="schedule-and-save-container">
          <div className="schedule-container">
            <div className="pickup-date-section">
              <label>Pickup Date</label>
              <DateTimePicker
                format={"pickup"}
                onOpen={handleCalendarOpen}
                selectedDate={pickupDate}
                onDateChange={handlePickupDateChange}
                selectedTime={pickupTime}
                onTimeChange={handlePickupTimeChange}
                pickupDate={pickupDate}
                dropoffDate={dropoffDate}
                pickupTime={pickupTime}
                dropoffTime={dropoffTime}
              />
              {showDatePickerOnMobile && (
                <div
                  className="mobile-date-picker-top-menu" id="mobile-date-picker-top-menu"
                  onClick={(event) => event.stopPropagation()}
                >
                  {/*<button*/}
                  {/*  className="x-button"*/}
                  {/*  onClick={(event) => {*/}
                  {/*    event.stopPropagation(); // Prevent closing the picker*/}
                  {/*    setShowDatePickerOnMobile(false); // Close the menu*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <X className="x-icon" size={24} weight="bold" />*/}
                  {/*</button>*/}
                  {/*<h2 className="booking-details-title">Your Traveling Dates</h2>*/}
                  <button className={`confirm-button ${showDatePickerOnMobile ? 'visible' : 'hidden'}`} onMouseDown={((prev) => {setShowDatePickerOnMobile(!prev)})}>
                    Confirm Date Selection
                  </button>
                </div>
              )}
            </div>
            <div className="dropoff-date-section">
              <label>Drop-off Date</label>
              <DateTimePicker
                format={"dropoff"}
                selectedDate={dropoffDate}
                onOpen={handleCalendarOpen}
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


  if (mobileDisplaySize) {
    return (mobileDisplayForm())
  }

  return entireBookingForm();
}

export default BookingForm;