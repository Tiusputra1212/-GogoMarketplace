import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

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
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{delay: 0.4}}
        >
          #GOGOMARKETPLACE
        </motion.h1>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{delay: 0.6}}
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