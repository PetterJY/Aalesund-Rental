import "../global.css";
import './Home.css';
import React from "react";
import calenderImage from "../../resources/images/calendar.png";

const Home = (props) => {

  const pickupSection = (
    <div className="pickup-dropoff">
      <label id="pickup-label" className="pickup-dropoff-text">Pickup</label>
      <DatePicker date={props.pickUpDate} time={props.pickUpTime} />
    </div>
  );

  const dropoffSection = (
    <div className="pickup-dropoff">
      <label className="dropoff-label pickup-dropoff-text">Dropoff</label>
      <DatePicker date={props.dropOffDate} time={props.dropOffTime} />
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

const DatePicker = ({ date, time }) => {
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