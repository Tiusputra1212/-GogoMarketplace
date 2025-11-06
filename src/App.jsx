import React from 'react';
// PENTING: Import Router components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 

// 🚨 Tambahkan import AuthProvider
import { AuthProvider } from './context/AuthContext'; 

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CardSection from './components/CardSection';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

export const version = '0.4.1';

export default function App() {
  return (
    // 1. Bungkus dengan AuthProvider
    <AuthProvider> 
      <Router>
        <div className="app-container">
          {/* Navbar kini dapat mengakses status login */}
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
            {/* Halaman Login dan Register */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Tambahkan halaman Dashboard atau Profile di sini */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}