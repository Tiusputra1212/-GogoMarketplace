// D:\-GogoMarketplace\-GogoMarketplace\src\components\Navbar\Navbar.jsx

import React, { useState } from 'react'; 
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext'; 

// 🔑 1. IMPORT FILE LOGO DI SINI
// Sesuaikan path jika 'logo.png' berada di tempat lain (misalnya '../../public/logo.png')
import LogoImage from '../assets/logo.png'; 

function Navbar() {
  // State untuk mengontrol visibilitas dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  
  const ver = '1.0.0'; 
  const navigate = useNavigate();
  
  // Dapatkan state dari AuthContext
  const { isLoggedIn, username, logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  // Fungsi untuk membuka/menutup dropdown (Jika ini adalah dropdown user, beri nama yang lebih spesifik)
  const toggleUserDropdown = () => { 
    setIsDropdownOpen(prev => !prev);
  };
  
  // Fungsi handler untuk link Dashboard
  const handleDashboardClick = () => {
    setIsDropdownOpen(false); 
    navigate('/dashboard'); // Ganti dengan path halaman user Anda yang sebenarnya
  };

  // ➡️ Logika Kontrol Autentikasi (AuthControl tidak berubah signifikan)
  const AuthControl = () => {
    if (isLoggedIn) {
      return (
        // TAMPILAN KETIKA SUDAH LOGIN (Dropdown User)
        <div className="user-profile-wrapper">
          <span 
            className="welcome-username clickable" 
            onClick={toggleUserDropdown}
          >
            {username} 
            <i className={`arrow-icon ${isDropdownOpen ? 'up' : 'down'}`}></i>
          </span>

          {isDropdownOpen && (
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
        // TAMPILAN KETIKA BELUM LOGIN (Teks Link "Masuk")
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
        {/* 🔑 2. GANTI TEKS DENGAN GAMBAR LOGO */}
        <Link to="/" className="navbar-logo">
          <img src={LogoImage} alt="#GOGOMARKETPLACE Logo" className="logo-img" />
        </Link>
      </div>
      
      <div className="navbar-right">
        {/* 1. List Navigasi (ul) */}
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li> 
            {/* Tambahkan kembali link Program dan Joki Program jika perlu */}
        </ul>
    
        {/* 2. Kontrol User/Login (Sejajar dengan ul) */}
        <AuthControl /> 
        
        {/* 3. Versi (Sejajar dengan ul) */}
        <span className="version-number">{`V${ver}`}</span> 
      </div>
    </motion.nav>
  );
}

export default Navbar;