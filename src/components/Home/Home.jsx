import React from "react";
import calenderImage from "../../resources/images/calendar.png"
import './Home.css';

const Home = (props) => {
  return (
    <main id="content">
      <section id="styledContainer">
        <DatePicker
            label="Pickup"
            date={props.pickUpDate}
            time={props.pickUpTime}
        />
        <DatePicker
          label="Dropoff"
          date={props.dropOffDate}
          time={props.dropOffTime}
        />
        <div class="show-cars">
          <button class="show-cars-button">
            Show cars
          </button>
        </div>
      </section>
    </main>
  );
};

const DatePicker = ({ label, date, time}) => {
  return (
      <section className="pickup-dropoff">
        <label className="pickup-dropoff-text">{label}</label>
        <div className="date-time-picker">
          <div className="date-time-picker-content">
            <div className="date-picker-content">
              <button className="date-picker-button"></button>
              <img className="calendar-image" src={calenderImage} alt="calendar image"/>
              <p>{date}</p>
            </div>
            <div className="divider"></div>
            <div className="time-picker-content">
              <button className="time-picker-button"></button>
              <p>{time}</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Home;