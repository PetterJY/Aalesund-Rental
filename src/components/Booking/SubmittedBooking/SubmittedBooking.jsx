
import React, { useEffect } from "react";
import "./SubmittedBooking.css";

const SubmittedBooking = () => {
  return (
    <main className="submitted-booking-page">
      <section aria-labelledby="booking-success-heading">
        <h1 id="booking-success-heading" className="completed-booking-message">Booking Submitted Successfully!</h1>
        <p>Thank you for your booking. We will process it shortly.</p>
        <a href="/account/orders" className="view-orders-link" aria-label="View your order history">View your orders</a>
      </section>
    </main>
  );
};

export default SubmittedBooking;