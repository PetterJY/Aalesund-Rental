import React from "react";
import "./SubmittedBooking.css";

const SubmittedBooking = () => {
  return (
    <main className="submitted-booking-page">
      <h1 className="completed-booking-message">Booking Submitted Successfully!</h1>
      <p>Thank you for your booking. We will process it shortly.</p>
      <a href="/account/orders">View your orders</a>
    </main>
  );
};

export default SubmittedBooking;