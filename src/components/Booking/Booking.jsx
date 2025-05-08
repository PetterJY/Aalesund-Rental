import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { mapCarImage } from '../utils/CarImageMapper';
import { getAccountId } from "../utils/JwtUtility";
import storageLogo from "../../resources/images/storage-logo.png";
import "./Booking.css";
import "../App.css";

const Booking = () => {
	const location = useLocation();
	const carId = location.state || null;

	const [carDetails, setCarDetails] = useState(null);
	const [accountDetails, setAccountDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchCarDetails() {
			setIsLoading(true);
			try {
				const response = await fetch(`http://localhost:8080/cars/${carId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("jwt")}`,
					},
				})
				
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const carDetails = await response.json();
				setCarDetails(carDetails);
				setIsLoading(false);
				console.log("Car details fetched:", carDetails);
			} 
			
			catch(error) {
				console.error(error);
			};
		}
		fetchCarDetails();
	}, [carId]);

  useEffect(() => {
    async function fetchAccountDetails() {
			const userId = getAccountId();
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const accountDetails = await response.json();
        setAccountDetails(accountDetails);
        console.log("Account details fetched:", accountDetails);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    }

    fetchAccountDetails();
  }, []);
	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (!carDetails) {
		return <p>No car details available.</p>;
	}

	const carImage = mapCarImage(carDetails.carBrand, carDetails.modelName);

  return (
		<main className="booking-page">
			<section className="driver-information-form">	
				<form action="/submit-booking" method="post" className="grid-container">
					<h2 className="driver-information">Driver Information</h2>   
					<div className="e-mail">
						<label htmlFor="email">Email:</label>
						<input type="email" id="email" name="email" value={accountDetails?.email || ""} readOnly required></input>
					</div>  
					<div className="first-name">
						<label htmlFor="name">First Name:</label>
						<input type="text" id="name" name="name" value={accountDetails.firstName || ""} readOnly required></input>
					</div>
					<div className="last-name">
						<label htmlFor="last-name">Last Name:</label>
						<input type="text" id="last-name" name="last-name" value={accountDetails?.lastName || ""} readOnly required></input>
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
						{ isLoading ? (
							<p>Loading...</p>
						) : (
							<>
								<h2>{carDetails.carBrand} {carDetails.modelName}</h2>
								<p className="rent-period">{carDetails.rentalPeriod}</p>
							</>
						)}
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
							{isLoading ? (
								<p>Loading...</p>
							) : (
								<>
									<h4>{carDetails.provider.companyName}</h4>
									<p className="pickup-time">{carDetails.pickUpTime}</p>
								</>
							)}
						</div>
						<div className="dropoff-info">
							<p className="dropoff">Dropoff</p>
							{isLoading ? (
								<p>Loading...</p>
							) : (
								<>
									<h4>{carDetails.provider.companyName}</h4>
									<p className="dropoff-time">{carDetails.dropOffTime}</p>
								</>
							)}
						</div>
					</div>
				</section>
				<footer className="payment-details">
					<p>Renting costs:</p>
					{isLoading ? (
						<p>Loading...</p>
					) : (
						<>
							<p>{carDetails.rentalPeriod} days</p>
							<p>{carDetails.pricePerDay}kr/day</p>
						</>
					)}
				</footer>
			</div>
		</main>
  )
}


export default Booking;