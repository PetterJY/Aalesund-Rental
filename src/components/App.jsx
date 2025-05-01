import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Rental from './Rental/Rental';
import CarDisplay from './Rental/CarDisplay/CarDisplay';
import CarSelected from './Rental/CarSelected/CarSelected';
import Booking from './Booking/Booking';
import Account from './Account/Account';
import Orders from './Account/Orders/Orders';
import MyRentals from './Account/MyRentals/MyRentals';
import PageNotFound from './PageNotFound/PageNotFound';
import carImage from '../resources/images/car.png';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Navigate to={"/home"} replace />} />
        <Route path="home" element={<LoadHome />} />
        <Route path="rental" element={<LoadRental />} />
        <Route path="booking" element={<LoadBooking />} />
        <Route path="account" element={<Navigate to="/account/account" replace />} /> 
        <Route path="account/account" element={<LoadAccount />} />
        <Route path="account/orders" element={<LoadOrders />} />
        <Route path="account/my-rentals" element={<LoadMyRentals />} />
        <Route path="account/my-cars" element={<LoadMyCars />} /> {/* TODO: Add My Cars component */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
} //TODO: Use 'useLoaderData' from react-router-dom to load data from the database to the front-end.

function Root() {
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function LoadHome() {
  return (
    <Home pickUpDate="2021-10-10" pickUpTime="12:00" dropOffDate="2021-10-15" dropOffTime="12:00"/>
  );
}

function LoadAccount() {
  return (
    <Account />
  );
}

function LoadOrders() {
  const orders = [
      { id:"1", brand: "Volkswagen", model: "Biggerstraum", rentingTime: 6, pickUpLocation: "Ålesund", dropOffLocation: "Ålesund",
        pickUpTime:"Th., 18. Mar., 2025 || 10:00", dropOffTime:"Th., 25. Mar., 2025 || 18:00", pricePerDay: 100, 
        priceTotal:600, image: carImage },
  ];

  return <Orders orders={orders} />;
}

function LoadMyRentals() {
  const rentals = [
    { id:"1", brand: "Volkswagen", model: "Biggerstraum", rentingTime: 6, pickUpLocation: "Ålesund", dropOffLocation: "Ålesund",
      pickUpTime:"Th., 18. Mar., 2025 || 10:00", dropOffTime:"Th., 25. Mar., 2025 || 18:00", pricePerDay: 100, 
      priceTotal:600, image: carImage },
  ];

  return <MyRentals importedRentals={rentals} />;
}

function LoadMyCars() {
  const cars = [
    { id:"1", brand: "Volkswagen", model: "Biggerstraum",  pricePerDay: 100, priceTotal:600, plateNumber: "XXX123", productionYear: 2003, 
      passengers: 4, automatic: true, energyScource: "Electric",  image: carImage, },
  ];

  return <MyRentals rentals={cars} />;
}

function LoadRental() {
  const cars = [
    { id: "1", brand: "Volvo", model: "V33", tag: "Electric", passengers: "4", place: "Ålesund", dayPrice: "500", totalPrice: "1500" },
    { id: "2", brand: "Mercedes", model: "7039" , tag: "Diesel", passengers: "4", place: "Ålesund", dayPrice: "600", totalPrice: "1800" },
    { id: "3", brand: "Audi", model: "R8" , tag: "Gasoline", passengers: "4", place: "Ålesund", dayPrice: "550", totalPrice: "1650" },
    { id: "4", brand: "BMW", model: "WMB" , tag: "Electric", passengers: "4", place: "Ålesund", dayPrice: "700", totalPrice: "2100" },
    { id: "5", brand: "Toyota", model: "Corolla" , tag: "Diesel", passengers: "4", place: "Ålesund", dayPrice: "450", totalPrice: "1350" },
    { id: "6", brand: "Ford", model: "Focus" , tag: "Gasoline", passengers: "4", place: "Ålesund", dayPrice: "500", totalPrice: "1500" },
    { id: "7", brand: "Nissan", model: "Speed" , tag: "Electric", passengers: "4", place: "Ålesund", dayPrice: "600", totalPrice: "1800"},
  ];

  return (
    <Rental>
      {cars.map(car => (
        <CarDisplay 
          key={`CD${car.id}`}
          id={car.id}
          carBrand={car.brand}
          carModel={car.model}
          carTag={car.tag}
          passengerCount={car.passengers}
          rentalPlace={car.place}
          priceDay={car.dayPrice}
          priceTotal={car.totalPrice}
          image={carImage}
        />
      ))}

      {cars.map(car => {
        return (
          <CarSelected 
            key={`CS${car.id}`}
            id={car.id}
            className="menu"
            carBrand={car.brand}
            carModel={car.model}
            carTag={car.tag}
            passengerCount={car.passengers}
            rentalPlace={car.place}
            priceDay={car.dayPrice}
            priceTotal={car.totalPrice}
            image={carImage}
          />
        );
      })}
    </Rental>
  );
}

function LoadBooking() {
  return (
    <Booking carName="Volkswagen Biggerstraum" rentalPeriod="5 days" 
    pickUpLocation="Ålesund" pickUpTime="12:00" 
    dropOffLocation="Oslo" dropOffTime="12:00" 
    costPerDay="$100" totalCost="$500"/>
  );
}

export default App;