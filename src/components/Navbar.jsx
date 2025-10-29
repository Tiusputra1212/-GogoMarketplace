import React from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';


var app="../../app.jsx"

function Navbar() {
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
          <li><a href="app">Beranda</a></li>
          <li><a href="#">Program</a></li>
          <li><a href="#">Joki Program</a></li>
        </ul>
        <motion.button 
          className="btn-masuk"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "#2563eb",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Masuk
        </motion.button>
        <span className="version-number">V0.1</span>
      </div>
    </motion.nav>
  );
}


export default Navbar;