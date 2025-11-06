import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { Link, useNavigate } from 'react-router-dom'; // 👈 Import useNavigate
import './Register.css';

function Register() {
  // PENTING: Gunakan 'username' atau 'name' secara konsisten. 
  // Saya pertahankan 'name' sesuai kode Anda, tetapi seringkali disebut 'username' untuk autentikasi.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(''); // State untuk pesan kesalahan
  
  const navigate = useNavigate(); // 👈 Inisialisasi hook useNavigate

  const handleSubmit = async (event) => { // 👈 Jadikan async
    event.preventDefault(); 
    setError('');

    // 1. Logika Validasi Frontend
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok!");
      return;
    }
    if (!termsAccepted) {
      setError("Anda harus menyetujui syarat & ketentuan.");
      return;
    }

    try {
      // 2. Mengirim data ke API Backend
      const response = await fetch('http://localhost:5000/api/register', { // Ganti URL ini!
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name, // Kirim sebagai username (sesuaikan dengan backend Anda)
          email,
          password,
        }),
      });

      const data = await response.json(); // Ambil respons dari server

      if (response.ok) {
        // Pendaftaran Berhasil!
        alert('Pendaftaran Berhasil! Sekarang Anda bisa masuk.');
        
        // 🚨 3. Mengalihkan ke halaman Login
        navigate('/login'); 

      } else {
        // Pendaftaran Gagal (misalnya: username/email sudah terdaftar, error validasi server)
        // Ambil pesan error dari backend jika tersedia
        setError(data.message || 'Pendaftaran gagal. Silakan coba lagi.'); 
        
      }
    } catch (err) {
      // Kesalahan Jaringan
      console.error('Terjadi kesalahan koneksi:', err);
      setError('Gagal terhubung ke server. Pastikan server backend berjalan.');
    }
  };

  return (
    <div className="register-container">
      <motion.form
        className="register-form"
        onSubmit={handleSubmit}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h2 className="form-title">DAFTAR</h2> 
        
        {/* Menampilkan pesan error */}
        {error && <p className="error-message" style={{ color: 'red', margin: '10px 0' }}>{error}</p>}

        {/* 1. INPUT NAMA */}
        <div className="form-group">
          <div className="input-with-icon">
            <i className="fa fa-user icon"></i> 
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Username"
            />
          </div>
        </div>

        {/* 2. INPUT EMAIL */}
        <div className="form-group">
          <div className="input-with-icon">
            <i className="fa fa-envelope icon"></i> 
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="E-mail"
            />
          </div>
        </div>

        {/* 3. INPUT PASSWORD */}
        <div className="form-group">
          <div className="input-with-icon">
            <i className="fa fa-lock icon"></i> 
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
        </div>

        {/* 4. INPUT CONFIRM PASSWORD */}
        <div className="form-group">
          <div className="input-with-icon">
            <i className="fa fa-lock icon"></i> 
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm a password"
            />
            <i className="Repassword"></i> 
          </div>
        </div>
        
        {/* 5. CHECKBOX TERMS & CONDITIONS */}
        <div className="terms-conditions">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <label htmlFor="terms">Saya menyetujui kebijakan yang berlaku</label>
        </div>

        {/* 6. TOMBOL REGISTER */}
        <motion.button
          type="submit"
          className="btn-register"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Daftar Sekarang
        </motion.button>

        {/* 7. LINK LOGIN NOW */}
        <div className="login-link-section">
          <p>
            Sudah memiliki akun? 
            <Link to="/login" className="login-link">Masuk</Link>
          </p>
        </div>

      </motion.form>
    </div>
  );
}

export default Register;