import React, {useContext, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mapCarImage } from '../utils/CarImageMapper';
import { getRole, getAccountId, makeApiRequest } from "../utils/JwtUtility";
import { useAuth } from "../utils/AuthContext";
import storageLogo from "../../resources/images/storage-logo.png";
import "./Booking.css";
import {BookingContext} from "../utils/BookingContext";
import {formatDate} from "date-fns";

const Booking = () => {
	const { isAuthenticated, isAuthInitialized } = useAuth();

	const navigate = useNavigate();

	const role = getRole();

	const { carId } = useParams();

	const { bookingData : rentalDetails, setBookingData : setRentalDetails } = useContext(BookingContext);

	const totalCost = Math.imul((rentalDetails.dropoffDate - rentalDetails.pickupDate) / (1000 * 60 * 60 * 24),
		rentalDetails.pricePerDay)

	const [accountDetails, setAccountDetails] = useState(null);

	const [isLoading, setIsLoading] = useState(true);

    async function fetchCarDetails() {
        setIsLoading(true);
        try {
            const carDetails = await makeApiRequest(`https://norwegian-rental.online/api/cars/${carId}`);

            setRentalDetails({
                ...rentalDetails,
                carId: carDetails.id,
                providerId: carDetails.provider.id,
                carBrand: carDetails.carBrand,
                modelName: carDetails.modelName,
                companyName: carDetails.provider.companyName,
                pricePerDay: carDetails.pricePerDay,
                totalCost: carDetails.totalCost || 0,
            });

        }
        catch(error) {
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
        const accountDetails = await makeApiRequest(`https://norwegian-rental.online/api/accounts/${accountId}`);
        setAccountDetails(accountDetails);
      } catch (error) {
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





	const submitBooking = async (event) => {
		event.preventDefault(); // Prevent default form submission

		if (!isAuthenticated) {
			console.warn("User is not authenticated. Can't submit booking.");
			return;
		}

		if (role !== "ROLE_USER") {
			console.warn("Account is not of role USER.");
			return;
		}

		const userId = getAccountId();

		const bookingData = {
			renterId: userId,
			providerId: rentalDetails.providerId,
			carId: rentalDetails.carId,
			startDate: rentalDetails.pickupDate,
			endDate: rentalDetails.dropoffDate,
			pickupLocation: rentalDetails.pickupLocation,
			dropoffLocation: rentalDetails.dropoffLocation,
			totalCost: totalCost,
			status: "PENDING",
		};

		try {
				const booking = await makeApiRequest("https://norwegian-rental.online/api/rentals", {
						method: "POST",
						body: JSON.stringify(bookingData),
				});
				
				navigate("/submitted-booking");

				return booking;
			} catch (error) {
		}
	}



  return (
		<main className="booking-page">
			<section className="driver-information-form">
				<form className="grid-container">
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
					<br/>
					<div className="phone-number">
						<label htmlFor="phone-number">Phone Number:</label>
						<input type="tel" id="phone-number" name="phone-number" value={accountDetails?.phoneNumber || ""} readOnly required></input>
					</div>
					<div className="submit-button-container">
						<button
							onClick={submitBooking}
							className="book-now-button"
							disabled={!isAuthenticated}
							aria-label="Book Now"
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
						<img src={storageLogo} className="pickup-logo" alt="Pickup location icon" />
						<div className="vertical-line" aria-hidden="true"></div>
						<img src={storageLogo} className="dropoff-logo" alt="Dropoff location icon" />
					</div>
					<div className="rental-schedule-text">
						<dl className="pickup-info">
							<dt className="pickup-dropoff-title">Pickup</dt>
							{isLoading ? (
								<dd>Loading...</dd>
							) : (
								<>
									<dd>{rentalDetails.pickupLocation}</dd>
									<dd className="pickup-dropoff-time">
										<time dateTime={new Date(rentalDetails.pickupDate).toISOString()}>
											{`${new Date().toLocaleDateString('en-US', {weekday: 'short'})} , 
											${formatDate(rentalDetails.pickupDate, "d. MMM, yyyy")}  | 
											${formatDate(rentalDetails.pickupTime, "HH:mm")}`}
										</time>
									</dd>
								</>
							)}
						</dl>
						<dl className="dropoff-info">
							<dt className="pickup-dropoff-title">Dropoff</dt>
							{isLoading ? (
								<dd>Loading...</dd>
							) : (
								<>
									<dd>{rentalDetails.dropoffLocation}</dd>
									<dd className="pickup-dropoff-time">
										<time dateTime={new Date(rentalDetails.dropoffDate).toISOString()}>
											{`${new Date().toLocaleDateString('en-US', {weekday: 'short'})} ,
											${formatDate(rentalDetails.dropoffDate, "d. MMM, yyyy")}  |
											${formatDate(rentalDetails.dropoffTime, "HH:mm")}`}
										</time>
									</dd>
								</>
							)}
						</dl>
					</div>
				</section>

				<section className="payment-details">
					<h3 className="booking-details-title">Renting costs</h3>
					{isLoading ? (
						<p role="status" aria-live="polite">Loading...</p>
					) : (
						<dl className="cost-breakdown">
							<dt>Duration:</dt>
							<dd>{`${Math.round((rentalDetails.dropoffDate - rentalDetails.pickupDate) / (1000 * 60 * 60 * 24))} days`}</dd>
							
							<dt>Daily rate:</dt>
							<dd>{`${Math.round(rentalDetails.pricePerDay)} kr/day`}</dd>
							
							<dt>Total cost:</dt>
							<dd><strong>{Math.round(totalCost)} kr/total</strong></dd>
						</dl>
					)}
				</section>
			</div>
		</main>
  )
}

export default Booking;