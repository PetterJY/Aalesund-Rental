import React from "react";
import { useEffect } from "react";
import carImage from "../../resources/images/car.png";
import storageLogo from "../../resources/images/storage-logo.png";
import "./Booking.css";
import "../App.css";

const BookingPage = (props) => {
	useEffect(() => {
		fetch(`http://localhost:8080/cars/${props.id}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error("Error fetching car details:", error);
			});
	}, [props.id]);

  return (
		<main className="booking-page">
			<section className="driver-information-form">	
				<form action="/submit-booking" method="post" className="grid-container">
					<h2 className="driver-information">Driver Information</h2>   
					<div className="e-mail">
						<label for="email">Email:</label>
						<input type="email" id="email" name="email" required></input>
					</div>  
					<div className="first-name">
						<label for="name">First Name:</label>
						<input type="text" id="name" name="name" required></input>
					</div>
					<div className="last-name">
						<label for="last-name">Last Name:</label>
						<input type="text" id="last-name" name="last-name" required></input>
					</div>
				</form>
				<button type="submit">Book Now</button>
			</section>

			<div className="car-information-form">
				<header className="car-rental-header">
					<div className="rectangle-display">
						<img id="car-image" src={carImage}></img>
					</div>      
					<div className="car-rental-details">
						<h2>{props.carName}</h2>
						<p className="rent-period">{props.rentalPeriod}</p>
					</div>
				</header>
				<section className="rental-schedule-container">
					<div className="rental-schedule-logos">
							<img src={storageLogo} className="pickup-logo"></img>
							<div className="vertical-line"></div>
							<img src={storageLogo} className="dropoff-logo"></img>
					</div>
					<div className="rental-schedule-text">
						<div className="pickup-info">
							<p className="pickup">Pickup</p>
							<h4>{props.pickUpLocation}</h4>
							<p className="pickup-time">{props.pickUpTime}</p>
						</div>
						<div className="dropoff-info">
							<p className="dropoff">Dropoff</p>
							<h4>{props.dropOffLocation}</h4>
							<p className="dropoff-time">{props.dropOffTime}</p>
						</div>
					</div>
				</section>
				<footer className="payment-details">
					<p>Renting costs:</p>
					<p>{props.costPerDay}kr/day</p>
					<h3>Total:{props.totalCost}kr</h3>
				</footer>
			</div>
		</main>
  )
}


export default BookingPage;