import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider } from "react-router";
import BookingPage from './BookingPage/BookingPage';
import CarDisplay from './CarDisplay/CarDisplay';
import CarSelected from './CarSelected/CarSelected';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Account from './Account/Account/Account';
import Bookings from './Account/Bookings/Bookings';
import Home from './Home/Home';
import RentalPage from './RentalPage/RentalPage';
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
  const cars = [
    { id: "1", name: "Volvo", tag: "Electric", passengers: "4", place: "Ålesund", dayPrice: "500 kr", totalPrice: "1500 kr" },
    { id: "2", name: "Mercedes", tag: "Diesel", passengers: "4", place: "Ålesund", dayPrice: "600 kr", totalPrice: "1800 kr" },
    { id: "3", name: "Audi", tag: "Gasoline", passengers: "4", place: "Ålesund", dayPrice: "550 kr", totalPrice: "1650 kr" },
    { id: "4", name: "BMW", tag: "Electric", passengers: "4", place: "Ålesund", dayPrice: "700 kr", totalPrice: "2100 kr" },
    { id: "5", name: "Toyota", tag: "Diesel", passengers: "4", place: "Ålesund", dayPrice: "450 kr", totalPrice: "1350 kr" },
    { id: "6", name: "Ford", tag: "Gasoline", passengers: "4", place: "Ålesund", dayPrice: "500 kr", totalPrice: "1500 kr" },
    { id: "7", name: "Nissan", tag: "Electric", passengers: "4", place: "Ålesund", dayPrice: "600 kr", totalPrice: "1800 kr" },
  ];

  return (
    <RentalPage>
      {cars.map(car => (
        <CarDisplay 
          key={`CD${car.id}`}
          id={car.id}
          carName={car.name}
          carTag={car.tag}
          passengerCount={car.passengers}
          rentalPlace={car.place}
          priceDay={car.dayPrice}
          priceTotal={car.totalPrice}
        />
      ))}

      {cars.map(car => {
        return (
          <CarSelected 
            key={`CS${car.id}`}
            id={car.id}
            className="menu"
            carName={car.name}
            carTag={car.tag}
            passengerCount={car.passengers}
            rentalPlace={car.place}
            priceDay={car.dayPrice}
            priceTotal={car.totalPrice}
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