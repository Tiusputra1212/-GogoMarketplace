import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import './CardSection.css'; 
import ecImage from '../assets/ec.png';
import im from '../assets/im.png';
import mb from '../assets/mb.png';
import SearchBar from './SearchBar';

const dummyCards = [
  { 
    id: 1, 
    image: ecImage, 
    title: 'E-Commerce Website Laravel', 
    description: 'Website e-commerce lengkap dengan admin panel',
    price: 'Rp 750,000',
    category: 'web',
    author: 'Ahmad Developer',
    seller: 'Ahmad Developer',
    language: 'PHP (Laravel)'
  },
  {
    id: 2,
    image: im,
    title: "Inventory Manager",
    description: "Aplikasi pengelola barang",
    price: 'Rp 850,000',
    category: "desktop",
    author: "Ananta",
    seller: "Ananta",
    language: "Electron / JS"
  },
  {
    id: 3,
    image: mb,
    title: "Mobile Banking",
    description: "Aplikasi pengelola keuangan",
    price: 'Rp 750,000',
    category: "mobile",
    author: "Teja",
    seller: "Teja",
    language: "React Native"
  },
  {
    id: 4,
    image: mb,
    title: "Mobile Banking Pro",
    description: "Versi lanjutan dengan fitur tambahan",
    price: 'Rp 1,200,000',
    category: "mobile",
    author: "Rian",
    seller: "Rian",
    language: "Flutter"
  }
];

// helper
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  const digits = priceStr.replace(/[^\d]/g, '');
  return Number(digits) || 0;
};

function CardSection() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const categories = useMemo(() => {
    const setCat = new Set(dummyCards.map(c => String(c.category).toLowerCase()));
    return Array.from(setCat);
  }, []);

  // filtered list
  const filteredCards = useMemo(() => {
    return dummyCards.filter(card => {
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || (
        card.title.toLowerCase().includes(q) ||
        (card.description || '').toLowerCase().includes(q) ||
        (card.author || '').toLowerCase().includes(q)
      );
      // category match
      const matchesCategory = categoryFilter === 'all' ||
        String(card.category).toLowerCase() === String(categoryFilter).toLowerCase();

      // price match
      const priceNum = parsePrice(card.price);
      let matchesPrice = true;
      if (priceFilter === '0-500000') matchesPrice = priceNum <= 500000;
      else if (priceFilter === '500001-1000000') matchesPrice = priceNum >= 500001 && priceNum <= 1000000;
      else if (priceFilter === '1000001+') matchesPrice = priceNum >= 1000001;

      return matchesQuery && matchesCategory && matchesPrice;
    });
  }, [query, categoryFilter, priceFilter]);

  const containerProps = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } };
  const cardHover = { whileHover: { scale: 1.02 }, transition: { type: 'spring', stiffness: 300 } };

  const openWhatsApp = (card) => {
    const message = `Halo, saya tertarik dengan "${card.title}" - ${card.price}. Penjual: ${card.seller}. Bisa bantu?`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div 
      className="card-section"
      {...containerProps}
    >
      <SearchBar
        categories={categories}
        onSearchChange={(q) => setQuery(q)}
        onCategoryChange={(c) => setCategoryFilter(c)}
        onPriceChange={(p) => setPriceFilter(p)}
      />

      <div className="cards-grid">
        {filteredCards.map(card => (
          <motion.div 
            key={card.id} 
            className="card-item"
            onClick={() => setSelectedCard(card)}
            {...cardHover}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter') setSelectedCard(card); }}
          >
            <img src={card.image} alt={card.title} className="card-image" />
            
            <div className="card-content">
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
              <div className="card-footer">
                  <span className="card-price">{card.price}</span>
                <span className={`card-category card-category-${String(card.category).toLowerCase()}`}>{card.category}</span>
              </div>
              <hr className="card-divider" />
              <p className="card-author">Oleh: {card.author}</p>

            </div>
          </motion.div>
        ))}
      </div>

      {selectedCard && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCard(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            style={{
              width: 360,
              maxWidth: '90%',
              background: '#fff',
              borderRadius: 8,
              padding: 20,
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <img src={selectedCard.image} alt={selectedCard.title} style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{selectedCard.title}</h3>
                <p style={{ margin: '6px 0', color: '#666', fontSize: 14 }}>{selectedCard.description}</p>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <p style={{ margin: '6px 0' }}><strong>Penjual:</strong> {selectedCard.seller}</p>
              <p style={{ margin: '6px 0' }}><strong>Bahasa / Teknologi:</strong> {selectedCard.language}</p>
              <p style={{ margin: '6px 0', color: '#1e88e5', fontWeight: 700 }}>{selectedCard.price}</p>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button
                className="btn-primary"
                onClick={() => openWhatsApp(selectedCard)}
                style={{ flex: 1 }}
              >
                Whatsapp
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default CardSection;