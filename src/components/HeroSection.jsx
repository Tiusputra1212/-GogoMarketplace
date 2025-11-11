import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';
import LogoImage from '../assets/logo.png'; 
import { Link } from 'react-router-dom'; // Import Link jika ingin menggunakan routing

// Konstanta WhatsApp untuk Joki Program
const JOKI_HP = "082247011652";
const JOKI_MESSAGE = "Halo, saya tertarik dengan layanan Joki Tugas. Apakah Anda bisa membantu?";

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

// FUNGSI KHUSUS UNTUK MEMBUKA WHATSAPP
const openJokiWhatsApp = () => {
    const cleanHp = String(JOKI_HP).replace(/[^\d]/g, '');
    let formattedHp = cleanHp;
    // Pastikan kode negara 62
    if (cleanHp.startsWith('0')) {
        formattedHp = '62' + cleanHp.substring(1);
    }
    
    const message = encodeURIComponent(JOKI_MESSAGE);
    const url = `https://wa.me/${formattedHp}?text=${message}`;
    
    window.open(url, '_blank');
};


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
        {/* LOGO */}
        <motion.img
          src={LogoImage} // Menggunakan variabel import
          alt="Logo GoGo Marketplace"
          className="header-logo"
          variants={textVariants} 
          initial="hidden"
          animate="visible"
          transition={{delay: 0.2}} 
        />
        
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{delay: 0.4}} 
        >
          Platform Terpercaya untuk Jual & Joki Program
        </motion.p>
        
        <div className="hero-buttons">
          {/* BUTTON BELI PROGRAM */}
          <motion.button
            className="btn-primary"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Menggunakan Link untuk routing internal */}
            <a href='/'>
            <i className="fas fa-shopping-cart"></i> Beli Program </a>
          </motion.button>

          {/* BUTTON JOKI PROGRAM (WHATSAPP) */}
          <motion.button
            className="btn-secondary"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openJokiWhatsApp} // Panggil fungsi WhatsApp di sini
          >
            <i className="fas fa-gamepad"></i> Joki Program
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;