import React, {useEffect, useRef, useState, memo, useContext} from 'react';
import DatePicker from "react-datepicker";
import {CalendarBlank} from "@phosphor-icons/react";
import {enGB} from "date-fns/locale/en-GB";
import {addDays, subDays, differenceInDays, formatDate} from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimePicker.css";
import {BookingContext} from "../../utils/BookingContext";

const DateTimePicker = memo(function DateTimePicker({ format: type, selectedDate, onDateChange, onTimeChange, pickupDate, dropoffDate, onOpen }) {
  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);
  const selectedTimeRef = useRef(null);
  const [isDatePickerSelected, setIsDatePickerSelected] = useState(false);
  const [isTimePickerSelected, setIsTimePickerSelected] = useState(false);
  const [monthsToShow, setMonthsToShow] = useState(3);
  const daysOfRental = [];
  const unavailableDays = [];
  const today = new Date();

  const {bookingData} = useContext(BookingContext);

  for (let i = 1; i < today.getDate() + 7; i++) {
    unavailableDays.push(subDays(today, i));
  }

  const nrOfDaysOfRental = differenceInDays(dropoffDate, pickupDate);
  if (type === "pickup" && dropoffDate !== null && pickupDate !== null) {
    for (let i = 1; i <= nrOfDaysOfRental; i++) {
      daysOfRental.push(addDays(pickupDate, i));
    }
  } else if (type === "dropoff" && dropoffDate !== null && pickupDate !== null) {
    for (let i = 1; i <= nrOfDaysOfRental; i++) {
      daysOfRental.push(subDays(dropoffDate, i));
    }
  }

  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-1": daysOfRental,
    },
    {
      "react-datepicker__day--highlighted-custom-2": [
        today
      ],
    }, {
      "react-datepicker__day--highlighted-custom-3": [pickupDate],
    }, {
      "react-datepicker__day--highlighted-custom-4": [dropoffDate],
    }, {
      "react-datepicker__day--highlighted-custom-5": unavailableDays,
    },
  ];

  const openDatePicker = () => {
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

  const [selectedTimes, setSelectedTime] = useState({
      pickup: "",
      dropoff: "",
    }
  );

  const handleRadioChange = (format, value) => {
    setSelectedTime(prev => ({
      ...prev,
      [format]: value
    }))
    selectedTimeRef.current.textContent = value;
    onTimeChange(value);
    setIsTimePickerSelected(false);
  }

  const renderRadioButtons = (format, options) => (
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target) &&
        event.target.id !== `${type}-picker` && event.target.id !== "mobile-date-picker-top-menu"
      ) {
        setIsTimePickerSelected(false);
      } else if (
        datePickerRef.current &&
        datePickerRef.current.input && // Access the DOM element
        !datePickerRef.current.input.contains(event.target) &&
        event.target.id !== `${type}-picker` && event.target.id !== "mobile-date-picker-top-menu"
      ) {
        setIsDatePickerSelected(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isTimePickerSelected]);


  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 1500) {
        setMonthsToShow(3);
      } else if (window.innerWidth > 900) {
        // TODO: turn these into constants?
        setMonthsToShow(2);
      } else {
        setMonthsToShow(12);
      }
    }
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const handleCalendarOpen = () => {
    if (datePickerRef.current) {
      const calendarContainer = datePickerRef.current.setOpen(true);
      if (calendarContainer) {
        calendarContainer.scrollTop = 100; // Scroll to the top
      }
    }
  };

  return (
    <div className="date-time">
      <div className={`date-picker ${isDatePickerSelected ? 'selected' : ''}`}>
        <button className="date-picker-button" onClick={openDatePicker}>
        </button>
        <CalendarBlank weight="bold" className="calendar-icon"/>
        <DatePicker
          ref={datePickerRef}
          onCalendarOpen={() => {
            setIsDatePickerSelected(true)
            handleCalendarOpen()
            onOpen()}}
          onCalendarClose={() => setIsDatePickerSelected(false)}
          selected={selectedDate}
          onChange={onDateChange}
          highlightDates={highlightWithRanges}
          monthsShown={monthsToShow}
          dateFormat="d. MMM"
          className="date-input"
          popperClassName="date-picker-popper"
          minDate={new Date()}
          showDisabledMonthNavigation
          disabledKeyboardNavigation
          startDate={new Date()}
          shouldCloseOnSelect={false}
          locale={enGB}
        />
      </div>
      <div className={`time-picker ${isTimePickerSelected ? 'selected' : ''}`}>
        <button className="time-picker-button"
                id={`${type}-time`}
                onMouseDown={() => setIsTimePickerSelected(true)}>
        </button>
        <span className="selected-time-option-text" ref={selectedTimeRef}>
          {`${type === "pickup" ? formatDate(new Date(bookingData.pickupTime), "HH:mm") : formatDate(new Date(bookingData.dropoffTime), "HH:mm")}`}
        </span>
        {isTimePickerSelected && (
          <div className="time-picker-radio" ref={timePickerRef}>
            {renderRadioButtons(type, timeOptions[type])}
          </div>
        )}
      </div>
    </div>
  );
});

export default DateTimePicker;