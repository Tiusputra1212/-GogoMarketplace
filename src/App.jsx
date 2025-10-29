import React from 'react';
// PENTING: Import Router components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CardSection from './components/CardSection';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

export const version = '0.4';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar /> 
        <Routes>
          <Route
            path="/" 
            element={
              <>
                <HeroSection />
                <CardSection />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}