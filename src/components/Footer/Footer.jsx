import React from 'react';
import './Footer.css';
import caretDown from "../../resources/images/caret-down.png";

const Footer = () => {
  return (
    <footer>
		<nav id="contact">
			<div class="menu">
				<p>Contact</p>
				<img src={caretDown} alt="dropdown-menu-contact"/>
			</div>
			<address>
				<ul className="footer-item">
					<li><a href="mailto:Ålesund@rental.com">Ålesund@rental.com</a></li>
				</ul>
			</address>
		</nav>

			<nav id="links">
				<div class="menu">
					<p>Links</p>
					<img src={caretDown} alt="dropdown-menu-links"/>
				</div>
				<ul className="footer-item">
					<li>
						<a href="https://github.com/PetterJY/Aalesund-Rental">GitHub</a>
					</li>
				</ul>
			</nav>

		<nav id="creators">
			<div class="menu">
				<p>Creators</p>
				<img src={caretDown} alt="dropdown-menu-creators"/>
			</div>
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