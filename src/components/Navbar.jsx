import React, { useState, useEffect, useRef } from 'react'; 
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext'; 

import LogoImage from '../assets/logo.png'; 

function Navbar() {
  // State untuk mengontrol visibilitas dropdown User/Login
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); 
  // State untuk mengontrol visibilitas dropdown Beranda
  const [isHomeDropdownOpen, setIsHomeDropdownOpen] = useState(false);
  
  const ver = '1.0.0'; 
  const navigate = useNavigate();
  
  // Ambil semua data dan fungsi yang diperlukan dari context
  const { isLoggedIn, user: username, logout } = useAuth(); 

  // Referensi untuk menangani klik di luar komponen (untuk menutup dropdown)
  const dropdownRef = useRef(null);

  // Efek untuk menangani klik di luar dropdown dan tombol ESC
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


  const handleLogout = () => {
    logout(); 
    navigate('/login'); // Arahkan ke halaman login setelah logout
    setIsUserDropdownOpen(false);
  };

  // Fungsi untuk membuka/menutup dropdown Beranda
  const toggleHomeDropdown = (event) => {
    event.stopPropagation(); // Mencegah event mousedown global menutupnya segera
    if (isLoggedIn) {
      setIsHomeDropdownOpen(prev => !prev);
      setIsUserDropdownOpen(false); // Pastikan dropdown user tertutup
    } else {
      navigate('/'); 
    }
  };

  // Fungsi untuk membuka/menutup dropdown User
  const toggleUserDropdown = (event) => { 
    event.stopPropagation();
    setIsUserDropdownOpen(prev => !prev);
    setIsHomeDropdownOpen(false); // Pastikan dropdown home tertutup
  };
  
  const handleDashboardClick = () => {
    setIsUserDropdownOpen(false); 
    navigate('/'); // Ganti dengan rute dashboard yang sebenarnya
  };

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
        <Link 
          to="/login"
          className="login-text-link" 
        >
          Masuk
        </Link>
      );
    }
  };

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
          {/* Menu Dropdown Beranda */}
          <li 
                className={`nav-item-dropdown ${!isLoggedIn ? 'disabled-link' : ''}`}
                onClick={toggleHomeDropdown} 
          >
            <span className="nav-link-dropdown-trigger clickable">
              Beranda 
            </span>
            
            {isLoggedIn && isHomeDropdownOpen && (
              <motion.div
                className="dropdown-menu home-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
              >
                <Link to="/sale" className="dropdown-item" onClick={() => setIsHomeDropdownOpen(false)}>
                  Menjual Program
                </Link>
                
                <div className="dropdown-divider"></div>

                <Link to="/beli" className="dropdown-item" onClick={() => setIsHomeDropdownOpen(false)}>
                  Beli Program
                </Link>

                <Link to="/joki" className="dropdown-item" onClick={() => setIsHomeDropdownOpen(false)}>
                  Joki Program
                </Link>

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