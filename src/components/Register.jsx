import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { Link } from 'react-router-dom'; // Untuk link kembali ke Login
import './Register.css';

// Anda mungkin perlu menginstal React Icons: npm install react-icons
// Jika menggunakan React Icons, ganti <i> dengan komponen ikon yang sesuai.

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); 
    
    // Logika Validasi Pendaftaran Dasar
    if (password !== confirmPassword) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }
    if (!termsAccepted) {
      alert("Anda harus menyetujui syarat & ketentuan.");
      return;
    }
    
    console.log('Pendaftaran berhasil:', { name, email, password });
    alert('Pendaftaran Berhasil! Mengalihkan ke halaman login...');
    
    // Biasanya, di sini Anda akan menggunakan navigate('/login')
  };

  return (
    <div className="register-container">
      {/* Jika Anda ingin partikel di sini juga, tambahkan komponen <Particles> di atas <motion.form> */}
      
      <motion.form
        className="register-form"
        onSubmit={handleSubmit}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h2 className="form-title">DAFTAR</h2> 

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
            {/* Opsi untuk menampilkan/menyembunyikan password, perlu logika JS */}
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