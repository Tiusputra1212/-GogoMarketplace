import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import './Sale.css'
function MenjualProgram() {
  const [formData, setFormData] = useState({
    penjual: '',
    judul: '',          
    deskripsi: '',      
    harga: '',          
    hp: '',
    bp: '', 
  });

  const [coverFile, setCoverFile] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setCoverFile(e.target.files[0]);
    } else {
      setCoverFile(null);
    }
  };
  const handleSubmit = async (e) => { 
    e.preventDefault();
    const apiUrl = 'http://localhost:5000/api/product'; 
    if (!coverFile) {
        alert('Mohon unggah file Cover Program.');
        return;
    }
    const dataToSend = new FormData();
    for (const key in formData) {
        dataToSend.append(key, formData[key]);
    }
    dataToSend.append('cover', coverFile); 
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            body: dataToSend, 
        });
        const result = await response.json();
        if (response.ok) {
            alert(`✅ Sukses: Program "${formData.judul}" berhasil didaftarkan! ID: ${result.productId}`);
            setFormData({ penjual: '', judul: '', deskripsi: '', harga: '', hp: '', bp: '' });
            setCoverFile(null);
        } else {
            alert(`❌ Gagal: ${result.message || 'Error tidak diketahui dari server.'}`);
        }
    } catch (error) {
        console.error('🚨 Error Jaringan/Fetch:', error);
        alert('🚨 Error Jaringan: Gagal terhubung ke server API. Pastikan server backend berjalan.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="page-container menjual-program-page" 
    >
      <header className="page-header header-background">
        <h1 className="header-title">Daftarkan Karya Terbaik Anda! 🌟</h1>
        <p className="header-subtitle">Langkah awal untuk mengubah kode menjadi keuntungan.</p>
      </header>
      <div className="content-wrapper">
        <section className="form-section form-card">
          <h2 className="section-title">Detail Program Baru</h2>
          <form onSubmit={handleSubmit} className="program-form">
            <div className="form-group">
              <label htmlFor="penjual">Nama Penjual:</label>
              <input 
                type="text" 
                id="penjual" 
                name="penjual" 
                value={formData.penjual}
                onChange={handleChange}
                placeholder="Masukkan Nama Anda"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="judul">Judul Program:</label>
              <input 
                type="text" 
                id="judul" 
                name="judul" 
                value={formData.judul}
                onChange={handleChange}
                placeholder="Nama aplikasi / program"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="deskripsi">Deskripsi Lengkap:</label>
              <textarea 
                id="deskripsi" 
                name="deskripsi" 
                value={formData.deskripsi}
                onChange={handleChange}
                rows="6"
                placeholder="Deskripsi"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="harga">Harga Jual (Rp):</label>
              <input 
                type="text" 
                id="harga" 
                name="harga" 
                value={formData.harga}
                onChange={handleChange}
                placeholder="Harga Jual"
                required 
                min="1000"
              />
            </div>
<div className="form-group">
    <label htmlFor="hp">Nomor HP/WA:</label>
    <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
        <span 
            style={{ 
                padding: '10px', 
                backgroundColor: '#eee', 
                borderRight: '1px solid #ccc',
                display: 'flex',
                alignItems: 'center',
                color: '#555'
            }}
        >
            +62
        </span>
        <input 
            type="text" 
            id="hp-input"
            name="hp" 
            value={formData.hp.startsWith('+62') ? formData.hp.substring(3) : formData.hp}
            onChange={handleChange} 
            placeholder="0812xxxxxxxx"
            required 
            style={{ 
                flexGrow: 1, 
                border: 'none', 
                padding: '10px',
                outline: 'none'
            }}
        />
    </div>
</div>
            <div className="form-group">
              <label htmlFor="bp">Bahasa Pemograman:</label>
              <input 
                type="text" 
                id="bp" 
                name="bp" 
                value={formData.bp}
                onChange={handleChange}
                placeholder="Bahasa Pemograman yang digunakan"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="cover">Foto Cover Program:</label>
              <input 
                type="file" 
                id="cover" 
                name="cover" 
                accept="image/*"
                onChange={handleFileChange} 
                required 
              />
            </div>
            <button type="submit" className="primary-button submit-button large-button">
              Daftarkan Program
            </button>
          </form>
        </section>
        <section className="info-section sidebar-card">
            <h2 className="section-title">🎯 Tips Penjual Sukses</h2>
            <ul className="info-list">
                <li>
                    <strong>Kualitas Deskripsi:</strong> Gunakan poin-poin yang mudah dibaca.
                </li>
                <li>
                    <strong>Media Visual:</strong> Wajib sertakan **Foto Cover** terbaik Anda!
                </li>
                <li>
                    <strong>Dukungan:</strong> Tawarkan dukungan pasca-penjualan yang jelas.
                </li>
            </ul>
        </section>
      </div>
    </motion.div>
  );
}

export default MenjualProgram;