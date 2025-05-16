import React, {useContext, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mapCarImage } from '../utils/CarImageMapper';
import { getRole, getAccountId } from "../utils/JwtUtility";
import { useAuth } from "../utils/AuthContext";
import storageLogo from "../../resources/images/storage-logo.png";
import "./Booking.css";
import "../App.css";
import {BookingContext} from "../utils/BookingContext";
import {formatDate} from "date-fns";

const Booking = () => {
	const { isAuthenticated, isAuthInitialized } = useAuth();

	const role = getRole();

	const { carId } = useParams();

	const { bookingData : rentalDetails, setBookingData : setRentalDetails } = useContext(BookingContext);

	const [accountDetails, setAccountDetails] = useState(null);

	const [isLoading, setIsLoading] = useState(true);

	async function fetchCarDetails() {
		setIsLoading(true);
		try {
			const response = await fetch(`http://localhost:8080/cars/${carId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
			})
			
			if (!response.ok) {
				throw new Error('Failed to fetch car details', response.statusText);
			}

			const carDetails = await response.json();
			console.log("Car details fetched:", carDetails);

			setRentalDetails(
				{
					...rentalDetails,
					carBrand: carDetails.carBrand,
					modelName: carDetails.modelName,
					companyName: carDetails.provider.companyName,
					pricePerDay: carDetails.pricePerDay,
				}
			);

			console.log("Rental details updated:", rentalDetails);
		}

		catch(error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchCarDetails();
	}, [carId]);

  useEffect(() => {
		if (!isAuthInitialized) {
			console.warn("Auth not initialized. Can't fetch Account Details.");
			return;
		}

    async function fetchAccountDetails() {
			if (!isAuthenticated) {
				console.warn("Can't fetch Account Details. User is not logged in.");
				return;
			}

			if (role !== "ROLE_USER") {
				console.warn("Account is not of role USER.");
				return;
			}

			const accountId = getAccountId();
      try {
        const response = await fetch(`http://localhost:8080/accounts/${accountId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch account details', response.statusText);
        }

        const accountDetails = await response.json();
        setAccountDetails(accountDetails);
        console.log("Account details fetched:", accountDetails);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAccountDetails();
  }, [isAuthenticated, isAuthInitialized, role]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (!rentalDetails) {
		return <p>No car details available.</p>;
	}

	const carImage = mapCarImage(rentalDetails.carBrand, rentalDetails.modelName);

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
						<label htmlFor="first-name">First Name:</label>
						<input type="text" id="first-name" name="first-name" value={accountDetails?.firstName || ""} readOnly required></input>
					</div>
					<div className="last-name">
						<label htmlFor="last-name">Last Name:</label>
						<input type="text" id="last-name" name="last-name" value={accountDetails?.lastName || ""} readOnly required></input>
					</div>
					<div className="phone-number">
						<label htmlFor="phone-number">Phone Number:</label>
						<input type="tel" id="phone-number" name="phone-number" value={accountDetails?.phoneNumber || ""} readOnly required></input>
					</div>
					<div className="submit-button-container">
						<button
							type="submit"
							className="book-now-button"
							disabled={!isAuthenticated}
						>
							Book Now
						</button>
						{!isAuthenticated && (
							<h4 className="login-warning">
								Please login or register to proceed with the booking.
							</h4>
						)}
					</div>
				</form>
			</section>

			<div className="car-information-form">
				<header className="car-rental-header">
					<div className="rectangle-display">
						<img id="car-image" src={carImage} alt="ordered-car-image"/>
					</div>
					<div className="car-rental-details">
						{ isLoading ? (
							<p>Loading...</p>
						) : (
							<>
								<h2>{rentalDetails.carBrand} {rentalDetails.modelName}</h2>
								<h4>Provider - {rentalDetails.companyName}</h4>
								<p className="rent-period">{rentalDetails.rentalPeriod}</p>
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
							<p className="pickup-dropoff-title">Pickup</p>
							{isLoading ? (
								<p>Loading...</p>
							) : (
								<>
									<p>{`${rentalDetails.pickupLocation}`}</p>
									<p className="pickup-dropoff-time">
										{`${new Date().toLocaleDateString('en-US', {weekday : 'short'})} , 
										${formatDate(rentalDetails.pickupDate, "d. MMM, yyyy")}  | 
										${formatDate(rentalDetails.pickupTime, "HH:mm")}`}
									</p>
								</>
							)}
						</div>
						<div className="dropoff-info">
							<p className="pickup-dropoff-title">Dropoff</p>
							{isLoading ? (
								<p>Loading...</p>
							) : (
								<><p>{`${rentalDetails.dropoffLocation}`}</p>
									<p className="pickup-dropoff-time">
										{`${new Date().toLocaleDateString('en-US', {weekday : 'short'})} ,
										${formatDate(rentalDetails.dropoffDate, "d. MMM, yyyy")}  |
								  	${formatDate(rentalDetails.dropoffTime, "HH:mm")}`}
									</p>
								</>
							)}
						</div>
					</div>
				</section>
				<footer className="payment-details">
					<p className="booking-details-title">Renting costs</p>
					{isLoading ? (
						<p>Loading...</p>
					) : (
						<>
							<p>{`${(rentalDetails.dropoffDate - rentalDetails.pickupDate) / (1000 * 60 * 60 * 24)} days`}</p>
							<p>{`${rentalDetails.pricePerDay} kr/day`}</p>
							<p>
								{`${Math.imul((rentalDetails.dropoffDate - rentalDetails.pickupDate) / (1000 * 60 * 60 * 24), 
								rentalDetails.pricePerDay)}`} in total
							</p>
						</>
					)}
				</footer>
			</div>
		</main>
  )
}

export default Booking;