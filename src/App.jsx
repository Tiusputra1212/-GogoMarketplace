import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SearchBar from './components/SearchBar';
import CardSection from './components/CardSection';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <HeroSection />
      <CardSection />
    </div>
  );
}

export default App;