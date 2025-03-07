import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
		<nav id="contact">
			<button className="menu-button">Contact</button>
			<address>
				<ul className="footer-item">
					<li><a href="mailto:Ålesund@rental.com">Ålesund@rental.com</a></li>
				</ul>
			</address>
		</nav>

		<nav id="links">
			<div id="menu">
				<h3>Menu</h3>
				<img src="../../resources/images/caret-down.png" alt="dropdown-menu"></img>
			</div>
			<button className="menu-button">Links</button>
			<ul className="footer-item">
				<li><a href="https://github.com/PetterJY/Aalesund-Rental">GitHub</a></li>
			</ul>
		</nav>

		<nav id="creators">
			<button className="menu-button">Creators</button>
			<ul className="footer-item">
				<li>Mathias Løvnes</li>
				<li>Marcus Skaue</li>
				<li>Petter Ytterdahl</li>
			</ul>
		</nav>
	</footer>
  );
};

export default Footer;