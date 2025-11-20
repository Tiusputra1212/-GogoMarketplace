import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

import LogoImage from '../assets/logo.png';

function Navbar() {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false); // ✅ DITAMBAHKAN

  const ver = '1.0.0';
  const navigate = useNavigate();
  const { isLoggedIn, user: username, logout } = useAuth();
  const dropdownRef = useRef(null);

  // ============================
  // CLOSE DROPDOWN WHEN CLICK OUTSIDE
  // ============================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
        setIsHomeDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsUserDropdownOpen(false);
        setIsHomeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // =====================
  // LOGOUT
  // =====================
  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsUserDropdownOpen(false);
  };

  const toggleHomeDropdown = (event) => {
    event.stopPropagation();
    if (isLoggedIn) {
      setIsHomeDropdownOpen(prev => !prev);
      setIsUserDropdownOpen(false);
    } else {
      navigate('/');
    }
  };

  const toggleUserDropdown = (event) => {
    event.stopPropagation();
    setIsUserDropdownOpen(prev => !prev);
    setIsHomeDropdownOpen(false);
  };

  const handleDashboardClick = () => {
    setIsUserDropdownOpen(false);
    navigate('/');
  };

  // ========================
  // AUTH SECTION
  // ========================
  const AuthControl = () => {
    if (isLoggedIn) {
      return (
        <div className="user-profile-wrapper">
          <span
            className="welcome-username clickable"
            onClick={toggleUserDropdown}
          >
            {username}
          </span>

          {isUserDropdownOpen && (
            <motion.div
              className="dropdown-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <button onClick={handleDashboardClick} className="dropdown-item">
                Kembali ke Dashboard
              </button>

              <div className="dropdown-divider"></div>

              <button onClick={handleLogout} className="dropdown-item logout-item">
                Keluar
              </button>
            </motion.div>
          )}
        </div>
      );
    } else {
      return (
        <Link to="/login" className="login-text-link">
          Masuk
        </Link>
      );
    }
  };

  // ===========================
  // RETURN UI
  // ===========================
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
    >
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={LogoImage} alt="#GOGOMARKETPLACE Logo" className="logo-img" />
        </Link>
      </div>

      <div className="navbar-right" ref={dropdownRef}>
        <ul className="nav-links">
          <li
            className={`nav-item-dropdown ${!isLoggedIn ? 'disabled-link' : ''}`}
            onClick={toggleHomeDropdown}
          >
            <span className="nav-link-dropdown-trigger clickable">Beranda</span>

            {/* HOME DROPDOWN */}
            {isLoggedIn && isHomeDropdownOpen && (
              <motion.div
                className="dropdown-menu home-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  to="/sale"
                  className="dropdown-item"
                  onClick={() => setIsHomeDropdownOpen(false)}
                >
                  Menjual Program
                </Link>

                <div className="dropdown-divider"></div>
              </motion.div>
            )}
          </li>
        </ul>

        <AuthControl />
        <span className="version-number">{`V${ver}`}</span>
      </div>
    </motion.nav>
  );
}

export default Navbar;
