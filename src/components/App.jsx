import React from 'react';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate, Outlet} from "react-router-dom";
import Header from './Header/Header';
import Footer from './Footer/Footer';
import BookingPage from './BookingPage/BookingPage';
import RentalPage from './RentalPage/RentalPage';
import CarDisplay from './CarDisplay/CarDisplay';
import Home from './Home/Home';
import './App.css';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path={"/"} element={<Root />}>
    <Route index element={<Navigate to={"/home"} replace />} />
    
    <Route path={"home"} element={<HomeExample />} />
    <Route path={"rental"} element={<RentalPageExample />} />
    <Route path={"booking"} element={<BookingPageExample />} />
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

function RentalPageExample() {
  return (
    <RentalPage>
      <CarDisplay carName="Volvo" carTag="Sedan" passengerCount="4" rentalPlace="Ålesund" priceDay="500 kr/dag" priceTotal="1500 kr"/>
      <CarDisplay carName="Mercedes" carTag="Sedan" passengerCount="4" rentalPlace="Ålesund" priceDay="600 kr/dag" priceTotal="1800 kr"/>
      <CarDisplay carName="Audi" carTag="Sedan" passengerCount="4" rentalPlace="Ålesund" priceDay="550 kr/dag" priceTotal="1650 kr"/>
    </RentalPage>
  );
}

function BookingPageExample() {
  return (
    <BookingPage carName="Volvo" rentalPeriod="5 days" pickUpLocation="Ålesund" pickUpTime="12:00" dropOffLocation="Oslo" dropOffTime="12:00" costPerDay="$100" totalCost="$500"/>
  );
}

export default App;