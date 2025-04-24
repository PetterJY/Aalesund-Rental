import React, {useEffect, useState} from 'react';
import './Footer.css';
import { CaretDown } from '@phosphor-icons/react';

const Footer = () => {

	const [isContactExpanded, setIsContactExpanded] = useState(false);
	const [isLinksExpanded, setIsLinksExpanded] = useState(false);
	const [isCreatorsExpanded, setIsCreatorsExpanded] = useState(false);
	const [isMobileDisplaySize, setIsMobileDisplaySize] = useState(false);

	const toggleContact = () => {
		setIsContactExpanded(!isContactExpanded);
	};

	const toggleLinks = () => {
		setIsLinksExpanded(!isLinksExpanded);
	};

	const toggleCreators = () => {
		setIsCreatorsExpanded(!isCreatorsExpanded);
	};

	useEffect(() => {
		const handleWindowResize = () => {
			if (window.innerWidth <= 1000) {
				setIsMobileDisplaySize(true);
			} else {
				setIsMobileDisplaySize(false);
				setIsLinksExpanded(true);
				setIsContactExpanded(true);
				setIsCreatorsExpanded(true);
			}
		};

		handleWindowResize();
		window.addEventListener('resize', handleWindowResize);
		return () => {window.removeEventListener('resize', handleWindowResize)}
	}, []);

  return (
    <footer className="footer-section">
			<nav id="contact">
				<div className="menu">
					<h2>Contact</h2>
					<DropdownMenu isExpanded={isContactExpanded} onClick={toggleContact} isMobileDisplaySize={isMobileDisplaySize}/>
				</div>
				{(isContactExpanded || !isMobileDisplaySize) && (
					<address>
						<ul className="footer-item">
							<li><a href="mailto:Ålesund@rental.com">Ålesund@rental.com</a></li>
						</ul>
					</address>
				)}
				<p className="footer-item">Main office:</p>
				<div className="map-container">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87445.97657997388!2d86.9340451045387!3d27.98023467131937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e854a215bd9ebd%3A0x576dcf806abbab2!2sMount%20Everest!5e0!3m2!1sno!2sno!4v1744215495004!5m2!1sno!2sno"
						style={{ border: 0 }}
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						title="Main Office Address Map"
					/>
				</div>
			</nav>

			<nav id="links">
				<div className="menu">
					<h2>Links</h2>
					<DropdownMenu isExpanded={isLinksExpanded} onClick={toggleLinks} isMobileDisplaySize={isMobileDisplaySize}/>
				</div>
				{(isLinksExpanded || !isMobileDisplaySize) && (
					<ul className="footer-item">
						<li>
							<a href="https://github.com/PetterJY/Aalesund-Rental">GitHub</a>
						</li>
					</ul>
				)}
			</nav>

			<nav id="creators">
				<div className="menu">
					<h2>Creators</h2>
					<DropdownMenu isExpanded={isCreatorsExpanded} onClick={toggleCreators} isMobileDisplaySize={isMobileDisplaySize}/>
				</div>
				{(isCreatorsExpanded || !isMobileDisplaySize) && (
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

const DropdownMenu = ({isExpanded, onClick, isMobileDisplaySize}) => {
	return (
		<button
				 className={`dropdown ${isExpanded ? 'expanded' : 'not-expanded'} ${isMobileDisplaySize ? 'visible' : 'not-visible'}`}
				 onClick={onClick}
				 alt="dropdown-menu-icon"
				 color="white"
				 style={isExpanded ? { transform: 'rotate(180deg)' } : {}}>
				<CaretDown size={25} color='white'/>
				 </button>
	)
}


export default Footer;