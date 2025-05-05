import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Rental from './Rental/Rental';
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
        <Route path="rental" element={<Rental />} />
        <Route path="booking" element={<LoadBooking />} />
        <Route path="account" element={<Navigate to="/account/account" replace />} /> 
        <Route path="account/account" element={<LoadAccount />} />
        <Route path="account/orders" element={<LoadOrders />} />
        <Route path="account/my-rentals" element={<MyRentals />} />
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


function LoadBooking() {
  return (
    <Booking carName="Volkswagen Biggerstraum" rentalPeriod="5 days" 
    pickUpLocation="Ålesund" pickUpTime="12:00" 
    dropOffLocation="Oslo" dropOffTime="12:00" 
    costPerDay="$100" totalCost="$500"/>
  );
}

export default App;