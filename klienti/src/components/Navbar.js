import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../components/Navbar.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track login status

  const openNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    // Perform logout actions here
    // Clear any user session data, such as tokens or user information stored in local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Set login status to false
    setIsLoggedIn(false);
  
    // Optionally, you can show a toast message or perform any other action after logout
    toast.success('Logged out successfully');
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="">
          HMS <span className="navbar-sign">+</span>
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Home
          </Link>
        </li>
        <li>
          <a href="#services" className="navbar-links">
            Services
          </a>
        </li>
        <li>
          <a href="#about" className="navbar-links">
            About
          </a>
        </li>
        <li>
          <a href="#reviews" className="navbar-links">
            Reviews
          </a>
        </li>
        <li>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="navbar-links sign-in-button">
              <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
            </button>
          ) : (
            <Link to="/LoginForm" className="navbar-links sign-in-button">
              <FontAwesomeIcon icon={faSignInAlt} /> Sign In
            </Link>
          )}
        </li>
      </ul>
      
      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li>
            <Link onClick={openNav} to="/">
              Home
            </Link>
          </li>
          <li>
            <a onClick={openNav} href="#services">
              Services
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={openNav} href="#reviews">
              Reviews
            </a>
          </li>
          <li>
            {isLoggedIn ? (
              <button onClick={handleLogout} className="navbar-links sign-in-button">
                <FontAwesomeIcon icon={faSignOutAlt} /> Log Out
              </button>
            ) : (
              <Link onClick={openNav} to="/LoginForm" className="navbar-links sign-in-button">
                <FontAwesomeIcon icon={faSignInAlt} /> Sign In
              </Link>
            )}
          </li>
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon
          icon={faBars}
          onClick={openNav}
          className="hamb-icon"
        />
      </div>
    </div>
  );
}

export default Navbar;
