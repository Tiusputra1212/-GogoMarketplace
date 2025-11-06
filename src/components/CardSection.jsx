// File: src/components/CardSection.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import './CardSection.css'; 
// Import dummy images hanya sebagai fallback jika URL gambar gagal, tapi idealnya gunakan URL dari DB
import ecImage from '../assets/ec.png'; 
import im from '../assets/im.png';

// Import komponen SearchBar (asumsi sudah ada)
import SearchBar from './SearchBar';

// URL dasar untuk gambar dan API
const API_URL = 'http://localhost:5000/api/products';
const IMAGE_BASE_URL = 'http://localhost:5000/uploads/'; // Sesuai dengan konfigurasi Express.static

// helper untuk mengkonversi harga string ke angka (tetap dipertahankan)
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  const digits = String(priceStr).replace(/[^\d]/g, '');
  return Number(digits) || 0;
};

// Fungsi untuk membuat URL WhatsApp
const createWhatsAppUrl = (hp, title) => {
    // Pastikan nomor HP diawali kode negara (misal: 62 untuk Indonesia)
    const cleanHp = String(hp).replace(/[^\d]/g, '');
    let formattedHp = cleanHp;
    if (cleanHp.startsWith('0')) {
        formattedHp = '62' + cleanHp.substring(1);
    }
    const message = `Halo, saya tertarik dengan program "${title}" di GogoMarketplace. Apakah masih tersedia?`;
    return `https://wa.me/${formattedHp}?text=${encodeURIComponent(message)}`;
};

/**
 * FUNGSI Pengecekan status login (Asumsi menggunakan Local Storage)
 * Kita asumsikan kunci 'user' digunakan untuk menyimpan status login.
 */
const checkLoginStatus = () => {
    // Menggunakan 'user' sebagai kunci login, pastikan sesuai dengan implementasi login Anda
    const userItem = localStorage.getItem('user'); 
    return !!userItem; 
};


function CardSection() {
  const [products, setProducts] = useState([]); // Data asli dari API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  // State untuk menyimpan status login
  const [isLoggedIn, setIsLoggedIn] = useState(checkLoginStatus());
  // const [loginAlert, setLoginAlert] = useState(false); // Dihilangkan karena tidak digunakan

  // --- START: PERBAIKAN LOGIKA REAL-TIME LOGIN ---
  useEffect(() => {
    // 1. Set status awal
    setIsLoggedIn(checkLoginStatus());

    // 2. Fungsi handler untuk event storage
    const handleStorageChange = () => {
      // Ini memastikan komponen merespons jika status login berubah di tab/jendela lain
      setIsLoggedIn(checkLoginStatus());
    };

    // 3. Tambahkan event listener untuk perubahan localStorage (Event 'storage')
    window.addEventListener('storage', handleStorageChange);

    // 4. Cleanup function (menghapus listener saat komponen dilepas)
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  // --- END: PERBAIKAN LOGIKA REAL-TIME LOGIN ---


  // 1. FETCH DATA DARI BACKEND
  const fetchProducts = useCallback(async () => {
// ... (Tidak ada perubahan pada fetchProducts)
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Gagal memuat produk. Cek koneksi server backend (Port 5000).");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Categories dihitung dari data asli (products)
  const categories = useMemo(() => {
    const setCat = new Set(products.map(c => String(c.bp).toLowerCase())); 
    return ['all', ...Array.from(setCat)];
  }, [products]);

  // 2. FILTERING DATA
  const filteredCards = useMemo(() => {
    return products.filter(card => {
// ... (Tidak ada perubahan pada filtering)
      const q = query.trim().toLowerCase();
      // Pencarian berdasarkan Judul, Deskripsi, Penjual
      const matchesQuery = !q || (
        card.judul.toLowerCase().includes(q) ||
        (card.deskripsi || '').toLowerCase().includes(q) ||
        (card.penjual || '').toLowerCase().includes(q)
      );
      
      // Filter Kategori (Bahasa Pemrograman / BP)
      const matchesCategory = categoryFilter === 'all' ||
        String(card.bp).toLowerCase() === String(categoryFilter).toLowerCase();

      // Filter Harga
      const priceNum = parsePrice(card.harga);
      let matchesPrice = true;
      if (priceFilter === '0-500000') matchesPrice = priceNum <= 500000;
      else if (priceFilter === '500001-1000000') matchesPrice = priceNum >= 500001 && priceNum <= 1000000;
      else if (priceFilter === '1000001+') matchesPrice = priceNum >= 1000001;

      return matchesQuery && matchesCategory && matchesPrice;
    });
  }, [query, categoryFilter, priceFilter, products]);

  const containerProps = { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } };
  const cardHover = { whileHover: { scale: 1.02 }, transition: { type: 'spring', stiffness: 300 } };

  // 3. FUNGSI UNTUK KLIK WHATSAPP
  const openWhatsApp = (card) => {
    // Fungsi ini hanya dipanggil jika isLoggedIn === true
    if (card.hp) {
      const url = createWhatsAppUrl(card.hp, card.judul);
      window.open(url, '_blank');
    } else {
      alert("Nomor HP penjual tidak tersedia.");
    }
  };

  // FUNGSI BARU: Menangani klik jika login diperlukan
  const handleLoginRequired = () => {
    // Asumsi: navigasi ke halaman login
    window.location.href = '/login'; 
    // Tutup modal
    setSelectedCard(null);
  };


  // Tampilan Loading dan Error
  if (loading) return <div className="card-section loading-message">Memuat produk... 🔄</div>;
  if (error) return <div className="card-section error-message">❌ {error}</div>;

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
        {filteredCards.length > 0 ? (
          filteredCards.map(card => (
            <motion.div 
              key={card.id} 
              className="card-item"
              onClick={() => setSelectedCard(card)} 
              {...cardHover}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => { if (e.key === 'Enter') setSelectedCard(card); }}
            >
              <img 
                src={card.cover ? IMAGE_BASE_URL + card.cover : im} 
                alt={card.judul} 
                className="card-image" 
              />
              
              <div className="card-content">
                <h3 className="card-title">{card.judul}</h3>
                <p className="card-description">{card.deskripsi}</p>
                <div className="card-footer">
                    <span className="card-price">Rp {parsePrice(card.harga).toLocaleString('id-ID')}</span>
                  <span className={`card-category card-category-${String(card.bp).toLowerCase()}`}>{card.bp}</span>
                </div>
                <hr className="card-divider" />
                <p className="card-author">Oleh: {card.penjual}</p>

              </div>
            </motion.div>
        ))
      ) : (
            <p className="no-results-message">Tidak ada program yang cocok dengan filter Anda.</p>
        )}
      </div>

      {/* Modal Detail Program */}
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
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
              <img 
                src={selectedCard.cover ? IMAGE_BASE_URL + selectedCard.cover : im} 
                alt={selectedCard.judul} 
                style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 6 }} 
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0 }}>{selectedCard.judul}</h3>
                <p style={{ margin: '6px 0', color: '#666', fontSize: 14 }}>{selectedCard.deskripsi}</p>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <p style={{ margin: '6px 0' }}><strong>Penjual:</strong> {selectedCard.penjual}</p>
              <p style={{ margin: '6px 0' }}><strong>Bahasa / Teknologi:</strong> {selectedCard.bp}</p>
              <p style={{ margin: '6px 0', color: '#1e88e5', fontWeight: 700 }}>
                Rp {parsePrice(selectedCard.harga).toLocaleString('id-ID')}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button
                className="btn-primary"
                // Logika penentuan onClick dan style berdasarkan status login
                onClick={isLoggedIn ? () => openWhatsApp(selectedCard) : handleLoginRequired}
                style={{ 
                  flex: 1, 
                  // Warna Hijau WA jika sudah login, Kuning jika belum
                  background: isLoggedIn ? '#25d366' : '#ffc107', 
                  color: isLoggedIn ? 'white' : 'black' // Ganti warna teks jika kuning
                }} 
              >
                {isLoggedIn ? 'Hubungi Penjual (WhatsApp)' : '🟡 Login Dulu!'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default CardSection;