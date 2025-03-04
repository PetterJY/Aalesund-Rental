import "../global.css";
import './Home.css';
import React from "react";
import calenderImage from "../../resources/images/calendar.png"

const Home = (props) => {
  return (
    <main id="content">
      <section id="styledContainer">
        <section id="pickup" class="pickup-dropoff">
          <label for="styledContainer" class="pickup-dropoff-text">Pickup</label>
          <div class="date-time-picker">
            <div class="date-time-picker-content">
              <div class="date-picker-content">
                <button class="date-picker-button"></button>
                <img class="calendar-image" src={calenderImage}/>
                <p>{props.pickUpDate}</p>
              </div>
              <div class="divider"></div>
              <div class="time-picker-content">
                <button class="time-picker-button"></button>
                <p>{props.pickUpTime}</p>
              </div>
            </div>
          </div>
        </section>
        <section id="dropoff" class="pickup-dropoff">
          <label for="styledContainer" class="pickup-dropoff-text">Dropoff</label>
          <div class="date-time-picker">
            <div class="date-time-picker-content">
              <div class="date-picker-content">
                <button class="date-picker-button"></button>
                <img class="calendar-image" src={calenderImage}/>
                <p>{props.dropOffDate}</p>
              </div>
              <div class="divider"></div>
              <div class="time-picker-content">
                <button class="time-picker-button"></button>
                <p>{props.dropOffTime}</p>
              </div>
            </div>
          </div>
        </section>
        <div class="show-cars">
          <button class="show-cars-button">
            Show cars
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;