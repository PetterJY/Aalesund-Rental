import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
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
    <div className="footer-container">
      <section id="contact" aria-labelledby="contact-heading">
        <div className="menu">
          <h2 id="contact-heading">Contact</h2>
          <DropdownMenu 
            isExpanded={isContactExpanded} 
            onClick={toggleContact} 
            isMobileDisplaySize={isMobileDisplaySize}
            ariaControls="contact-content"
          />
        </div>
        <div id="contact-content" hidden={isMobileDisplaySize && !isContactExpanded}>
          <address>
            <ul className="footer-item">
              <li><a href="mailto:contact@norwegianrental.com">contact@norwegianrental.com</a></li>
            </ul>
          </address>
          <p className="footer-item">Main office:</p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1844.0139133010207!2d6.233333721756931!3d62.47213652544059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4616dac1b03a4a8b%3A0x5df22844dd93ce98!2sNTNU%20i%20%C3%85lesund!5e0!3m2!1sno!2sno!4v1745842717592!5m2!1sno!2sno"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Main Office Address Map"
              aria-label="Map showing the location of Norwegian Rental main office at NTNU Ålesund"
            />
          </div>
        </div>
      </section>

      <nav id="links" aria-labelledby="links-heading">
        <div className="menu">
          <h2 id="links-heading">Links</h2>
          <DropdownMenu 
            isExpanded={isLinksExpanded} 
            onClick={toggleLinks} 
            isMobileDisplaySize={isMobileDisplaySize}
            ariaControls="links-content"
          />
        </div>
        <div id="links-content" hidden={isMobileDisplaySize && !isLinksExpanded}>
          <ul className="footer-item">
            <li>
              <a href="https://github.com/PetterJY/Aalesund-Rental">GitHub</a>
            </li>
            <li>
              <a href="https://www.ntnu.edu/">NTNU</a>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>
        </div>
      </nav>

      <section id="creators" aria-labelledby="creators-heading">
        <div className="menu">
          <h2 id="creators-heading">Creators</h2>
          <DropdownMenu 
            isExpanded={isCreatorsExpanded} 
            onClick={toggleCreators} 
            isMobileDisplaySize={isMobileDisplaySize}
            ariaControls="creators-content"
          />
        </div>
        <div id="creators-content" hidden={isMobileDisplaySize && !isCreatorsExpanded}>
          <ul className="footer-item">
            <li>Mathias Løvnes</li>
            <li>Marcus Skaue</li>
            <li>Petter Ytterdahl</li>
          </ul>
        </div>
      </section>
    </div>
    <p className="footer-text">Copyright © 2025 Norwegian Rental</p>
    <p className="footer-text">* This website is a result of a university group project, performed in the course IDATA2301 Web
      technologies, at NTNU. All the information provided here is a result of imagination. Any
      resemblance with real companies or products is a coincidence.</p>
  </footer>
	);
};

const DropdownMenu = ({isExpanded, onClick, isMobileDisplaySize, ariaControls}) => {
  return (
    <button
      className={`dropdown ${isExpanded ? 'expanded' : 'not-expanded'} ${isMobileDisplaySize ? 'visible' : 'not-visible'}`}
      onClick={onClick}
      aria-expanded={isExpanded}
      aria-controls={ariaControls}
      aria-label={isExpanded ? "Collapse section" : "Expand section"} 
      style={isExpanded ? { transform: 'rotate(180deg)' } : {}}
    >
      <CaretDown size={25} color='white' aria-hidden="true" />
    </button>
  );
};


export default Footer;