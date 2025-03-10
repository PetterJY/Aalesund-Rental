import React, {useState} from 'react';
import './Footer.css';
import caretDown from "../../resources/images/caret-down.png";

const Footer = () => {
  return (
    <footer>
		<nav id="contact">
			<div className="menu">
				<p>Contact</p>
				<DropdownMenu/>
			</div>
			<address>
				<ul className="footer-item">
					<li><a href="mailto:Ålesund@rental.com">Ålesund@rental.com</a></li>
				</ul>
			</address>
		</nav>

			<nav id="links">
				<div className="menu">
					<p>Links</p>
					<DropdownMenu/>
				</div>
				<ul className="footer-item">
					<li>
						<a href="https://github.com/PetterJY/Aalesund-Rental">GitHub</a>
					</li>
				</ul>
			</nav>

		<nav id="creators">
			<div className="menu">
				<p>Creators</p>
				<DropdownMenu/>
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

const DropdownMenu = () => {
	const [isExpanded, setIsExpanded] = useState(false)

	const handleDropDownMenuClick = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<img src={caretDown}
				 className={`dropdown ${isExpanded ? 'clicked' : ''}`}
				 onClick={handleDropDownMenuClick}
				 alt="dropdown-menu-icon"/>
	)
}


export default Footer;