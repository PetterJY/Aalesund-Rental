import React from 'react';
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate, Outlet} from "react-router-dom";
import Header from './Header/Header';
import Footer from './Footer/Footer';
import BookingPage from './BookingPage/BookingPage';
import RentalPage from './RentalPage/RentalPage';
import CarDisplay from './CarDisplay/CarDisplay';
import CarSelected from './CarSelected/CarSelected';
import Home from './Home/Home';
import './App.css';
import { Car } from '@phosphor-icons/react';

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
      <CarDisplay carName="Volvo" carTag="Electric" passengerCount="4" rentalPlace="Ålesund" priceDay="500 kr" priceTotal="1500 kr"/>
      <CarDisplay carName="Mercedes" carTag="Diesel" passengerCount="4" rentalPlace="Ålesund" priceDay="600 kr" priceTotal="1800 kr"/>
      <CarDisplay carName="Audi" carTag="Gasoline" passengerCount="4" rentalPlace="Ålesund" priceDay="550 kr" priceTotal="1650 kr"/>
      <CarDisplay carName="BMW" carTag="Electric" passengerCount="4" rentalPlace="Ålesund" priceDay="700 kr" priceTotal="2100 kr"/>
      <CarDisplay carName="Toyota" carTag="Diesel" passengerCount="4" rentalPlace="Ålesund" priceDay="450 kr" priceTotal="1350 kr"/>
      <CarDisplay carName="Ford" carTag="Gasoline" passengerCount="4" rentalPlace="Ålesund" priceDay="500 kr" priceTotal="1500 kr"/>
      <CarDisplay carName="Nissan" carTag="Electric" passengerCount="4" rentalPlace="Ålesund" priceDay="600 kr" priceTotal="1800 kr"/>
      
      <CarSelected carName="Volvo" carTag="Electric" passengerCount="4" rentalPlace="Ålesund" priceDay="500 kr" priceTotal="1500 kr"/>
      <CarSelected carName="Mercedes" carTag="Diesel" passengerCount="4" rentalPlace="Ålesund" priceDay="600 kr" priceTotal="1800 kr"/>
      <CarSelected carName="Audi" carTag="Gasoline" passengerCount="4" rentalPlace="Ålesund" priceDay="550 kr" priceTotal="1650 kr"/>
      <CarSelected carName="BMW" carTag="Electric" passengerCount="4" rentalPlace="Ålesund" priceDay="700 kr" priceTotal="2100 kr"/>
      <CarSelected carName="Toyota" carTag="Diesel" passengerCount="4" rentalPlace="Ålesund" priceDay="450 kr" priceTotal="1350 kr"/>
      <CarSelected carName="Ford" carTag="Gasoline" passengerCount="4" rentalPlace="Ålesund" priceDay="500 kr" priceTotal="1500 kr"/>
      <CarSelected carName="Nissan" carTag="Electric" passengerCount="4" rentalPlace="Ålesund" priceDay="600 kr" priceTotal="1800 kr"/>
    </RentalPage>
  );
}

function BookingPageExample() {
  return (
    <BookingPage carName="Volkswagen Biggerstraum" rentalPeriod="5 days" pickUpLocation="Ålesund" pickUpTime="12:00" dropOffLocation="Oslo" dropOffTime="12:00" costPerDay="$100" totalCost="$500"/>
  );
}

export default App;