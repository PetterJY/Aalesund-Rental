import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate, Outlet} from "react-router-dom";
import { Car } from '@phosphor-icons/react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import BookingPage from './BookingPage/BookingPage';
import RentalPage from './RentalPage/RentalPage';
import CarDisplay from './CarDisplay/CarDisplay';
import CarSelected from './CarSelected/CarSelected';
import Account from './Account/Account/Account';
import Bookings from './Account/Bookings/Bookings';
import Home from './Home/Home';
import './App.css';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path={"/"} element={<Root />}>
    <Route index element={<Navigate to={"/home"} replace />} />
    <Route path={"home"} element={<HomeExample />} />
    <Route path={"rental"} element={<RentalPageExample />} />
    <Route path={"booking"} element={<BookingPageExample />} />
    <Route path={"account/account"} element={<AccountExample />} />
    <Route path={"account/bookings"} element={<BookingsExample />} />
  </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  );
}

function Root() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function HomeExample() {
  return (
    <Home pickUpDate="2021-10-10" pickUpTime="12:00" dropOffDate="2021-10-15" dropOffTime="12:00"/>
  );
}

function AccountExample() {
  return (
    <Account />
  );
}

function BookingsExample() {
  return (
    <Bookings />
  );
}

function RentalPageExample() {
  const [selectedCarId, setSelectedCarId] = useState(null);


  const cars = [
    { id: "1", name: "Volvo", tag: "Electric", passengers: "4", place: "Ålesund", dayPrice: "500 kr", totalPrice: "1500 kr" },
    { id: "2", name: "Mercedes", tag: "Diesel", passengers: "4", place: "Ålesund", dayPrice: "600 kr", totalPrice: "1800 kr" },
    { id: "3", name: "Audi", tag: "Gasoline", passengers: "4", place: "Ålesund", dayPrice: "550 kr", totalPrice: "1650 kr" },
    { id: "4", name: "BMW", tag: "Electric", passengers: "4", place: "Ålesund", dayPrice: "700 kr", totalPrice: "2100 kr" },
    { id: "5", name: "Toyota", tag: "Diesel", passengers: "4", place: "Ålesund", dayPrice: "450 kr", totalPrice: "1350 kr" },
    { id: "6", name: "Ford", tag: "Gasoline", passengers: "4", place: "Ålesund", dayPrice: "500 kr", totalPrice: "1500 kr" },
    { id: "7", name: "Nissan", tag: "Electric", passengers: "4", place: "Ålesund", dayPrice: "600 kr", totalPrice: "1800 kr" },
  ];

  const handleCarClick = (carId) => {
    console.log("ID of selected car:", carId); // Debug: Confirm this runs
    setSelectedCarId(prevId => {
      const newId = prevId === carId ? null : carId;
      return newId;
    });
  };

  const carDisplays = document.querySelectorAll('.car-display');
  const rentalPage = document.querySelector('.rental-page');
  
  function getCarsPerRow() {
    const carDisplay = carDisplays[0];
    const carDisplayStyles = window.getComputedStyle(carDisplay);
    const carDisplayWidth = carDisplay.offsetWidth + parseInt(carDisplayStyles.marginLeft) + parseInt(carDisplayStyles.marginRight);
    const rentalPageStyles = window.getComputedStyle(rentalPage);
    const rentalPageWidth = rentalPage.offsetWidth - parseInt(rentalPageStyles.paddingLeft) - parseInt(rentalPageStyles.paddingRight);
    const carsPerRow = Math.floor(rentalPageWidth / carDisplayWidth);
    return carsPerRow;
  }

  carDisplays.forEach(carDisplay => {
    carDisplay.addEventListener('click', () => {
    const carId = cars.id;
    const carSelected = document.getElementById(`CS${carId}`);
    const carsPerRow = getCarsPerRow();
    const carDisplayIndex = Array.from(carDisplay.parentNode.children).indexOf(carDisplay);
    const rowEndIndex = Math.ceil((carDisplayIndex + 1) / carsPerRow) * carsPerRow - 1;

    document.querySelectorAll('.car-selected').forEach(carSelected => {
      carSelected.classList.remove('active');
      rentalPage.appendChild(carSelected);
    });

    const insertAfter = carDisplays[Math.min(rowEndIndex, carDisplays.length - 1)];
    insertAfter.insertAdjacentElement('afterend', carSelected);
  
    carSelected.classList.toggle('active');
    });
  });

  return (
    <RentalPage>
      {/* Car Display Buttons */}
      {cars.map(car => (
        <CarDisplay 
          key={`CD${car.id}`}
          id={`CD${car.id}`}
          carName={car.name}
          carTag={car.tag}
          passengerCount={car.passengers}
          rentalPlace={car.place}
          priceDay={car.dayPrice}
          priceTotal={car.totalPrice}
          onClick={() => {
            handleCarClick(car.id);
          }} // Set the selected car when clicked
        />
      ))}

      

      {/* Car Selected Displays */}
      {cars.map(car => {
  return (
    <CarSelected 
      key={`CS${car.id}`}
      id={`CS${car.id}`}
      className="menu"
      carName={car.name}
      carTag={car.tag}
      passengerCount={car.passengers}
      rentalPlace={car.place}
      priceDay={car.dayPrice}
      priceTotal={car.totalPrice}
      style={{ 
        display: selectedCarId === car.id ? 'inline-block' : 'none',
      }}
    />
  );
})}
    </RentalPage>
  );
}

function BookingPageExample() {
  return (
    <BookingPage carName="Volkswagen Biggerstraum" rentalPeriod="5 days" pickUpLocation="Ålesund" pickUpTime="12:00" dropOffLocation="Oslo" dropOffTime="12:00" costPerDay="$100" totalCost="$500"/>
  );
}

export default App;