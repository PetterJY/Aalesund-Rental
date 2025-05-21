import React from "react";
import { RocketLaunch, PencilLine, CarProfile, Book, UsersThree, AddressBook } from "@phosphor-icons/react";
import "./AboutUs.css";

const AboutUs = () => (
  <main className="aboutus-container">  
    <header className="aboutus-header">
      <h1>
        About Us
      </h1>
      <p className="aboutus-intro">
        Welcome to Norwegian Rental, your trusted platform for finding the best car rental deals across Norway. 
        We connect you with top rental providers, offering transparent price comparisons to make your journey seamless and affordable.
      </p>
    </header>

    <section className="aboutus-section">
      <h2>
        <RocketLaunch size={24} style={{ verticalAlign: "middle", marginRight: 8, color: " var(--secondary-color)" }} />
        Our Mission
      </h2>
      <p>
        Norwegian Rental is a student-driven project from NTNU, built to simplify car rentals. 
        Our portal lets you search, compare, and book cars from multiple providers, ensuring you find the best deal for your needs—whether it’s a weekend getaway or a cross-country adventure. 
        We prioritize transparency, user-friendliness, and equal treatment of all providers, with no exclusive partnerships.
      </p>
    </section>

    <section className="aboutus-section">
      <h2>
        <PencilLine size={24} style={{ verticalAlign: "middle", marginRight: 8, color: "var(--secondary-color)" }} />
        What We Do
      </h2>
      <p>
        We provide a comprehensive price overview of car rentals from third-party providers. 
        Norwegian Rental doesn’t own or rent cars; instead, we partner with trusted rental companies who pay a fee to advertise their vehicles on our platform. 
        Our intuitive search tools help you filter cars by price, availability, and features, empowering you to choose the best supplier for your trip.
      </p>
    </section>

    <section className="aboutus-section">
      <h2>
        <CarProfile size={24} style={{ verticalAlign: "middle", marginRight: 8, color: "var(--secondary-color)" }} />
        For Providers
      </h2>
      <p>
        Are you a car rental company looking to reach more customers? Join Norwegian Rental to showcase your vehicles to our growing user base. 
        To list your rentals on our platform, please contact us to set up a provider account.
      </p>
      <address>
        Reach out at <a href="mailto:providers@norwegianrental.com">providers@norwegianrental.com</a> to get started.
      </address>
    </section>

    <section className="aboutus-section">
      <h2>
        <Book size={24} style={{ verticalAlign: "middle", marginRight: 8, color: "var(--secondary-color)" }} />
        Our Story
      </h2>
      <p>
        Born from a passion for technology and travel, Norwegian Rental was created as part of the IDATA2301 Web Technologies and IDATA2306 Application Development courses at NTNU. 
        Our team of students aimed to build a reliable, user-centric platform that supports both travelers and local providers while showcasing modern web development practices.
      </p>
    </section>

    <section className="aboutus-section">
      <h2>
        <UsersThree size={24} style={{ verticalAlign: "middle", marginRight: 8, color: "var(--secondary-color)" }} />
        Meet the Team
      </h2>
      <ul className="aboutus-team-list">
        <li>Mathias Løvnes</li>
        <li>Marcus Skaue</li>
        <li>Petter Ytterdahl</li>
      </ul>
    </section>

    <section className="aboutus-section">
      <h2>
        <AddressBook size={24} style={{ verticalAlign: "middle", marginRight: 8, color: "var(--secondary-color)" }} />
        Contact Us
      </h2>
      <address>
        Have questions or feedback? We'd love to hear from you!<br />
        Email: <a href="mailto:contact@norwegianrental.com">contact@norwegianrental.com</a>
      </address>
    </section>
  </main>
);

export default AboutUs;