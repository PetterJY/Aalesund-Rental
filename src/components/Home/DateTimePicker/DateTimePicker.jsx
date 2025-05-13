import React, {useEffect, useRef, useState, memo} from 'react';
import DatePicker from "react-datepicker";
import {CalendarBlank} from "@phosphor-icons/react";
import {enGB} from "date-fns/locale/en-GB";
import {addDays, subDays, differenceInDays} from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import "./DateTimePicker.css"; // Copy relevant CSS from Header.css

const DateTimePicker = memo(function DateTimePicker({ format, selectedDate, onDateChange, onTimeChange, pickupDate, dropoffDate }) {
  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);
  const selectedTimeRef = useRef(null);
  const [isDatePickerSelected, setIsDatePickerSelected] = useState(false);
  const [isTimePickerSelected, setIsTimePickerSelected] = useState(false);
  const [monthsToShow, setMonthsToShow] = useState(3);
  const daysOfRental = [];
  const unavailableDays = [];
  const today = new Date();

  for (let i = 1; i < today.getDate() + 7; i++) {
    unavailableDays.push(subDays(today, i));
  }

  const nrOfDaysOfRental = differenceInDays(dropoffDate, pickupDate);
  if (format === "pickup" && dropoffDate !== null && pickupDate !== null) {
    for (let i = 1; i <= nrOfDaysOfRental; i++) {
      daysOfRental.push(addDays(pickupDate, i));
    }
  } else if (format === "dropoff" && dropoffDate !== null && pickupDate !== null) {
    for (let i = 1; i <= nrOfDaysOfRental; i++) {
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
        event.target.id !== `${format}-picker`
      ) {
        setIsTimePickerSelected(false);
      }
    }

    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, [isTimePickerSelected]);


  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth >= 1500) {
        setMonthsToShow(3);
      } else if (window.innerWidth > 900) {
        //TODO: turn these into constants?
        setMonthsToShow(2);
      } else {
        setMonthsToShow(1);
      }
    }
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

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
          monthsShown={monthsToShow}
          dateFormat="d. MMM"
          className="date-input"
          popperClassName="date-picker-popper"
          minDate={today}
          startDate={new Date()}
          openToDate={new Date()}
          shouldCloseOnSelect={false}
          locale={enGB}
          showDisabledMonthNavigation={false}
          disabledKeyboardNavigation={false}
        />
      </div>
      <div className={`time-picker ${isTimePickerSelected ? 'selected' : ''}`}>
        <button className="time-picker-button"
                id={`${format}-time`}
                onMouseDown={() => setIsTimePickerSelected(true)}>
        </button>
        <span className="selected-time-option-text" ref={selectedTimeRef}>11:00</span>
        {isTimePickerSelected && (
          <div className="time-picker-radio" ref={timePickerRef}>
            {renderRadioButtons(format, timeOptions[format])}
          </div>
        )}
      </div>
    </div>
  );
});

export default DateTimePicker;