import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Rental from './Rental/Rental/Rental';
import Booking from './Booking/Booking';
import ProtectedAccount from './Account/ProtectedAccount';
import Account from './Account/Account';
import Orders from './Account/Orders/Orders';
import MyRentals from './Account/MyRentals/MyRentals';
import PageNotFound from './PageNotFound/PageNotFound';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Navigate to={"/home"} replace />} />
          <Route path="home" element={<Home />} />
          <Route path="rental" element={<Rental />} />
          <Route path="booking" element={<Booking />} />

          <Route path="account" element={<ProtectedAccount />}>
            <Route index element={<Navigate to={"/account/account"} replace />} />
            <Route path="account" element={<Account />} />
            <Route path="orders" element={<Orders />} />
            <Route path="my-rentals" element={<MyRentals />} />
          </Route>
          
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
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