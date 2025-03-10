import React, {useState} from 'react';
import './Footer.css';
import caretDown from "../../resources/images/caret-down.png";

const Footer = () => {

	// State variables for each section
	const [isContactExpanded, setIsContactExpanded] = useState(false);
	const [isLinksExpanded, setIsLinksExpanded] = useState(false);
	const [isCreatorsExpanded, setIsCreatorsExpanded] = useState(false);

	// Handler functions for each section
	const toggleContact = () => {
		setIsContactExpanded(!isContactExpanded);
	};

	const toggleLinks = () => {
		setIsLinksExpanded(!isLinksExpanded);
	};

	const toggleCreators = () => {
		setIsCreatorsExpanded(!isCreatorsExpanded);
	};

  return (
    <footer>
		<nav id="contact">
			<div className="menu">
				<p>Contact</p>
				<DropdownMenu isExpanded={isContactExpanded} onClick={toggleContact}/>
			</div>
			{isContactExpanded && (
				<address>
					<ul className="footer-item">
						<li><a href="mailto:Ålesund@rental.com">Ålesund@rental.com</a></li>
					</ul>
				</address>
			)}
		</nav>

			<nav id="links">
				<div className="menu">
					<p>Links</p>
					<DropdownMenu isExpanded={isLinksExpanded} onClick={toggleLinks}/>
				</div>
				{isLinksExpanded && (
					<ul className="footer-item">
						<li>
							<a href="https://github.com/PetterJY/Aalesund-Rental">GitHub</a>
						</li>
					</ul>
				)}
			</nav>

		<nav id="creators">
			<div className="menu">
				<p>Creators</p>
				<DropdownMenu isExpanded={isCreatorsExpanded} onClick={toggleCreators}/>
			</div>
			{isCreatorsExpanded && (
				<ul className="footer-item">
					<li>Mathias Løvnes</li>
					<li>Marcus Skaue</li>
					<li>Petter Ytterdahl</li>
				</ul>
			)}
		</nav>
	</footer>
  );
};

const DropdownMenu = ({isExpanded, onClick}) => {
	return (
		<img src={caretDown}
				 className={`dropdown ${isExpanded ? 'expanded' : ''}`}
				 onClick={onClick}
				 alt="dropdown-menu-icon"/>
	)
}


export default Footer;