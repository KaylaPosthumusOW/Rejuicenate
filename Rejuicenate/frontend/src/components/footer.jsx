import React from 'react';
import '../styles/footer.css'; // Import the CSS file for styling
import Logo from '../assets/Logo-Rejuicenate.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="mt-5">
            <div className="footer-content">
                {/* Logo Section */}
                <div className="logo mb-2">
                    <img src={Logo} alt="Company Logo" />
                </div>

                {/* Navigation Links */}
                <ul className="footer-nav">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                {/* Social Media Links */}
                <div className="social-media">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebook} /> Facebook
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} /> Twitter
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} /> Instagram
                    </a>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="footer-bottom">
                <p><small>&copy; 2024 Rejuicenate. All rights reserved.</small></p>
            </div>
        </footer>
    );
};

export default Footer;
