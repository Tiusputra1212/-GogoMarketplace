import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

// Database input registration component
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // State
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    setError('');

    // Check validations
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok!");
      return;
    }
    if (!termsAccepted) {
      setError("Anda harus menyetujui syarat & ketentuan.");
      return;
    }

    try {
      // Post data ke backend
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Pendaftaran Berhasil! Sekarang Anda bisa masuk.');
        navigate('/login'); 

      } else {
        setError(data.message || 'Pendaftaran gagal. Silakan coba lagi.'); 
        
      }
    } catch (err) {
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
        transition={{ type: "spring", stiffness: 120 }}>
        <h2 className="form-title">DAFTAR</h2> 
        {error && <p className="error-message" style={{ color: 'red', margin: '10px 0' }}>{error}</p>}

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

        <motion.button
          type="submit"
          className="btn-register"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Daftar Sekarang
        </motion.button>

{/* Link Login */}
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