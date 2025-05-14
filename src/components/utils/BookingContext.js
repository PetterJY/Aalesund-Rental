import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    dropoffDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    pickupTime: new Date(new Date().setHours(12, 0)),
    dropoffTime: new Date(new Date().setHours(12, 0),
    )});

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};