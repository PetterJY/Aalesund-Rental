// src/context/BookingContext.jsx
import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    dropoffDate: new Date(new Date().setDate(new Date().getDate() + 13)),
    pickupTime: new Date(new Date().setHours(new Date().getHours() + 1, 0)),
    dropoffTime: new Date(new Date().setHours(new Date().getHours() + 2, 0))
  });

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};