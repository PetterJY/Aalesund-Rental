import React from "react";
import calenderImage from "../../resources/images/calendar.png";
import "../App.css";
import './Home.css';

const Home = (props) => {
  const pickupSection = (
    <div className="pickup-dropoff">
      <label id="pickup-label" className="pickup-dropoff-text">Pickup</label>
      <DateTimePicker date={props.pickUpDate} time={props.pickUpTime} />
    </div>
  );

  const dropoffSection = (
    <div className="pickup-dropoff">
      <label className="dropoff-label pickup-dropoff-text">Dropoff</label>
      <DateTimePicker date={props.dropOffDate} time={props.dropOffTime} />
    </div>
  );

  const showCarsSection = (
    <div className="show-cars">
      <button className="show-cars-button">Show cars</button>
    </div>  
  );

  return (
    <main id="content">
      <div id="styledContainer">
        {pickupSection}
        {dropoffSection}
        {showCarsSection}
      </div>
    </main>
  );
};

const DateTimePicker = ({ date, time }) => {
  return (
    <div className="date-time-picker">
      <div className="date-time-picker-content">
        <div className="date-picker-content">
          <button className="date-picker-button"></button>
          <img className="calendar-image" src={calenderImage} alt="calendar image" />
          <p>{date}</p>
        </div>
        <div className="divider"></div>
        <div className="time-picker-content">
          <button className="time-picker-button"></button>
          <p>{time}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;