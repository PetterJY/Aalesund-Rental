import React from "react";
import './Reputation.css'
import {CarProfile, HandCoins, Headset, ListPlus} from '@phosphor-icons/react';


const Reputation = () => {



  return (

    <div className="reputation-container">
      <h1>Why choose us?</h1>
      <div className="reputation-section">
        <div className="wide-range">
          <CarProfile size={72} weight="fill" className="car-profile-icon"/>
          <h2>Wide Range of Cars</h2>

        </div>
        <div className="affordable-rates">
          <HandCoins size={72} weight="fill" className="hand-coins-icon"/>
          <h2>Affordable Rates</h2>

        </div>
        <div className="support">
          <Headset size={72} weight="fill" className="headset-icon"/>
          <h2>24/7 Support</h2>

        </div>
        <div className="easy-booking">
          <ListPlus size={72} weight="fill" className="booking-icon"/>
          <h2>Easy Booking</h2>

        </div>
      </div>
    </div>
  )
}

export default Reputation;