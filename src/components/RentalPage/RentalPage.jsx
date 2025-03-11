import "../global.css";
import './RentalPage.css';
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { FunnelSimple } from "@phosphor-icons/react";

export default function RentalPage(props) {
  return (
    <div className="rental-page">
      <section class="main-section">
        <div>
      <nav className="sort-bar">
        <select name="Sort" className="sort-button" label = "Sort">
          <option value="sort">Sort</option>
          <option value="newest">Newest</option>
          <option value="price">Price</option>
          <option value="alphabet">Alphabet</option>
        </select>
        <select name="Car Type" className="sort-button">
          <option value="car type">Car Types</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="truck">Truck</option>
          <option value="coupe">Coupe</option>
          <option value="convertible">Convertible</option>
          <option value="electric">Electric</option>
          <option value="hybrid">Hybrid</option>
          <option value="diesel">Diesel</option>
          <option value="gas">Gas</option>
          <option value="luxury">Luxury</option>
        </select>
        <select name="Transmission Type" className="sort-button">
          <option value="transmission type">Transmission Type</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
        <select name="Passengers" onchange="updatePassengerText()" className="sort-button">
          <option value="Passengers" selected disabled>Passengers</option>
          <option value="2">2+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
          <option value="7">7+</option>
        </select>
        <button class="filter-button">
        <FunnelSimple size={20} color="#252322" />Sort and filter
        </button>
      </nav>
        <main className="main-body">
          {props.children}
        </main>
        </div>
      </section>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<RentalPage />);