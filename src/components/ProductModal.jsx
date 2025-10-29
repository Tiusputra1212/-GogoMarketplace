import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProductModal.css'; // Styling untuk modal ini

function ProductModal({ product, onClose }) {
  if (!product) return null;
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  };
  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { 
      y: "0", 
      opacity: 1, 
      transition: { delay: 0.1, duration: 0.3, type: "spring", stiffness: 100 } 
    },
    exit: { y: "100vh", opacity: 0, transition: { duration: 0.3 } } // Keluar ke bawah
  };

  const handleWhatsAppClick = () => {
    const message = `Halo, saya tertarik dengan produk "${product.title}" seharga ${product.price}. Bisakah saya mendapatkan informasi lebih lanjut?`;
    window.open(`https://wa.me/${product.detail.waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-backdrop" 
        onClick={onClose} // Tutup modal saat klik backdrop
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div 
          className="modal-content" 
          onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutup backdrop
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header Modal */}
          <div className="modal-header">
            <h3>{product.title}</h3>
            <button className="modal-close-btn" onClick={onClose}>
              &times; {/* Simbol 'x' */}
            </button>
          </div>

          {/* Gambar Produk */}
          <div className="modal-image-container">
            <img src={product.image} alt={product.title} className="modal-product-image" />
          </div>

          {/* Body Detail Produk */}
          <div className="modal-body">
            <p className="modal-description">{product.description}</p>
            
            <div className="modal-info-grid">
              <div className="modal-info-item">
                <span className="info-label">Penjual:</span>
                <span className="info-value">{product.detail.penjual}</span>
              </div>
              <div className="modal-info-item">
                <span className="info-label">Ukuran:</span>
                <span className="info-value">{product.detail.ukuran}</span>
              </div>
              <div className="modal-info-item">
                <span className="info-label">Bahasa:</span>
                <span className="info-value">{product.detail.bahasa}</span>
              </div>
              <div className="modal-info-item">
                <span className="info-label">Harga:</span>
                <span className="info-value modal-price-highlight">{product.price}</span>
              </div>
            </div>
            
            {/* Tombol WhatsApp */}
            <button className="btn-whatsapp" onClick={handleWhatsAppClick}>
              <i className="fab fa-whatsapp"></i> Hubungi via WhatsApp
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProductModal;