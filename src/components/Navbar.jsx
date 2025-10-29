import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import * as App from '../App.jsx';

function Navbar() {
  const ver = App?.version ?? '';
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
    >
      <div className="navbar-left">
        <div className="navbar-logo">#GOGOMARKETPLACE</div>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          <li><Link to="/">Beranda</Link></li> 
          <li><a href="#">Program</a></li>
          <li><a href="#">Joki Program</a></li>
        </ul>
        <motion.button 
          className="btn-masuk"
          onClick={handleLoginClick} 
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#2563eb",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Masuk
        </motion.button>
        <span className="version-number">{`V${ver}`}</span>
      </div>
    </motion.nav>
  );
}

export default Navbar;