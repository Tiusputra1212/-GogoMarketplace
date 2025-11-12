import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './SearchBar.css';
const searchBarVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut", delay: 0.8 } }
};

function SearchBar({ categories = [], onSearchChange, onCategoryChange, onPriceChange }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  useEffect(() => {
    if (onSearchChange) onSearchChange(query);
  }, [query, onSearchChange]);
  useEffect(() => {
    if (onCategoryChange) onCategoryChange(category);
  }, [category, onCategoryChange]);
  useEffect(() => {
    if (onPriceChange) onPriceChange(priceRange);
  }, [priceRange, onPriceChange]);

  return (
    <motion.div 
      className="search-bar-container"
      variants={searchBarVariants}
      initial="hidden"
      animate="visible">
      <div className="search-input-group">
        <i className="fas fa-search search-icon"></i>
        <input 
          type="text" 
          placeholder="Cari program impianmu..." 
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="search-filters">
        <select
          className="filter-btn"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Semua Kategori</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          className="filter-btn"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="all">Semua Harga</option>
          <option value="0-500000">0 - 500.000</option>
          <option value="500001-1000000">500.001 - 1.000.000</option>
          <option value="1000001+"> 1.000.000</option>
        </select>
      </div>
    </motion.div>
  );
}
export default SearchBar;