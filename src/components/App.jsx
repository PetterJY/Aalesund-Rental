import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import { BookingProvider } from "./utils/BookingContext";
import Home from './Home/Home';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Rental from './Rental/Rental';
import Booking from './Booking/Booking';
import ProtectedAccount from './Account/ProtectedAccount';
import Account from './Account/Account';
import Orders from './Account/Orders/Orders';
import MyRentals from './Account/MyRentals/MyRentals';
import Favourites from './Account/Favourites/Favourites';
import AdminRentals from './Account/AdminRentals/AdminRentals';
import AboutUs from './AboutUs/AboutUs';
import PageNotFound from './PageNotFound/PageNotFound';
import SubmittedBooking from './Booking/SubmittedBooking/SubmittedBooking';
import '../index.css';

function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Navigate to={"/home"} replace />} />
            <Route path="home" element={<Home />} />
            <Route path="rental" element={<Rental />} />

            <Route path="booking/:carId" element={<Booking />} />
            <Route path="booking" element={<Navigate to={"/rental"} replace />} />
            <Route path="submitted-booking" element={<SubmittedBooking />} />


            {/* Protected Routes */}
            <Route path="account" element={<ProtectedAccount />}>
              <Route index element={<Navigate to={"/account/account"} replace />} />
              <Route path="account" element={<Account />} />
              <Route path="orders" element={<Orders />} />
              <Route path="my-rentals" element={<MyRentals />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="admin-rentals" element={<AdminRentals />} />
            </Route>

            <Route path="about-us" element={<AboutUs />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BookingProvider>
    </AuthProvider>
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

export default App;