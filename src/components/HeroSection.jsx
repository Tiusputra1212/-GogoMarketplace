import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';
// 1. PASTIKAN PATH INI BENAR SESUAI LOKASI logo.png ANDA
import LogoImage from '../assets/logo.png'; 

var app = "../../app.jsx"
var joki = ""

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.5 } }
};

const backgroundVariants = {
  animate: {
    opacity: [0.8, 1, 0.8],
    scale: [1, 1.05, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
}

// ... (Bagian import dan variants tetap sama)

function HeroSection() {
  return (
    <div className="hero-container">
      <motion.div 
        className="hero-background-overlay"
        variants={backgroundVariants}
        animate="animate"
      >
        <div className="mesh-effect"></div>
      </motion.div>

      <div className="hero-content">
        {/* LOGO DI SINI */}
        <motion.img
          src={LogoImage} // Menggunakan variabel import
          alt="Logo GoGo Marketplace"
          className="header-logo"
          variants={textVariants} 
          initial="hidden"
          animate="visible"
          transition={{delay: 0.2}} 
        />
        
        {/* H1 KOSONG DIHAPUS, JADI P LANGSUNG DI BAWAH LOGO */}
        
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{delay: 0.4}} // Geser animasi sedikit lebih cepat
        >
          Platform Terpercaya untuk Jual & Joki Program
        </motion.p>
        
        <div className="hero-buttons">
          <motion.button
            className="btn-primary"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href='app'>
            <i className="fas fa-shopping-cart"></i> Beli Program </a>
          </motion.button>
          <motion.button
            className="btn-secondary"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            
          >
            <i className="fas fa-gamepad"></i> Joki Program
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;