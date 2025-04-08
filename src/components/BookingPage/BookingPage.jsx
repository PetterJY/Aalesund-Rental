import "../App.css";
import "./BookingPage.css";
import carImage from "../../resources/images/car.png";
import storageLogo from "../../resources/images/storage-logo.png";

const BookingPage = (props) => {
  return (
		<main>
			<section class="driver-information-form">	
				<form action="/submit-booking" method="post" class="grid-container">
					<h2 class="driver-information">Driver Information</h2>   
					<div class="e-mail">
						<label for="email">Email:</label>
						<input type="email" id="email" name="email" required></input>
					</div>  
					<div class="first-name">
						<label for="name">First Name:</label>
						<input type="text" id="name" name="name" required></input>
					</div>
					<div class="last-name">
						<label for="last-name">Last Name:</label>
						<input type="text" id="last-name" name="last-name" required></input>
					</div>
				</form>
				<button type="submit">Book Now</button>
			</section>

			<div class="car-information-form">
				<header class="car-rental-header">
					<div class="rectangle-display">
						<img id="car-image" src={carImage}></img>
					</div>      
					<div class="car-rental-details">
						<h2>{props.carName}</h2>
						<p class="rent-period">{props.rentalPeriod}</p>
					</div>
				</header>
				<section class="rental-schedule-container">
					<div class="rental-schedule-logos">
							<img src={storageLogo} class="pickup-logo"></img>
							<div class="vertical-line"></div>
							<img src={storageLogo} class="dropoff-logo"></img>
					</div>
					<div class="rental-schedule-text">
						<div class="pickup-info">
							<p class="pickup">Pickup</p>
							<h4>{props.pickUpLocation}</h4>
							<p class="pickup-time">{props.pickUpTime}</p>
						</div>
						<div class="dropoff-info">
							<p class="dropoff">Dropoff</p>
							<h4>{props.dropOffLocation}</h4>
							<p class="dropoff-time">{props.dropOffTime}</p>
						</div>
					</div>
				</section>
				<footer class="payment-details">
					<p>Renting costs:</p>
					<p>{props.costPerDay}kr/day</p>
					<h3>Total:{props.totalCost}kr</h3>
				</footer>
			</div>
		</main>
  )
}


export default BookingPage;