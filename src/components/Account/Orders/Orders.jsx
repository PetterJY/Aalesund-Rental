import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import OrdersCarDisplay from './OrdersCarDisplay'; 
import AccountHeader from '../AccountHeader/AccountHeader';
import '../Orders/Orders.css';
import '../../App.css';

const Orders = ({ orders = [] }) => { 
  useEffect(() => {
    fetch("http://localhost:8080/rentals/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ email: jwtDecode(localStorage.getItem("jwt")).sub }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="orders">
      <AccountHeader />
      <section className="orders-section">
        <div className="orders-list">
        <h2 className="title">My Bookings</h2>
        {orders.map((order) => (
            <OrdersCarDisplay
              key={order.id}
              brand={order.brand}
              model={order.model}
              pricePerDay={order.pricePerDay}
              rentingTime={order.rentingTime}
              pickUpLocation={order.pickUpLocation}
              dropOffLocation={order.dropOffLocation}
              pickUpTime={order.pickUpTime}
              dropOffTime={order.dropOffTime}
              priceTotal={order.priceTotal}
              image={order.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Orders;