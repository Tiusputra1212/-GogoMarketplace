import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext'; 

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CardSection from './components/CardSection';
import Login from './components/Login';
import Register from './components/Register';
import Sale from './components/Sale';
import './App.css';

export const version = '0.4.1';

export default function App() {
  return (
    <AuthProvider> 
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
            <Route path="/sale" element={<Sale />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}