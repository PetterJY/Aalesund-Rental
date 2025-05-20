import React from "react";
import './CallToAction.css'

const CallToAction = () => {
  return (
  <div className="cta-section">
    <h2>Ready to Hit the Road?</h2>
    <p>Book your car in just a few clicks.</p>
    <button className="cta-button" aria-label="Book Now">Book Now</button>
  </div>
  )
}

export default CallToAction;