import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import './Login.css';

var register = './Register.jxs'

// Jika Anda menggunakan React Icons, Anda bisa mengimpor di sini, misalnya:
// import { FaUser, FaLock, FaFacebook, FaGoogle } from 'react-icons/fa';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log('Username:', username, 'Password:', password);
    alert('Mencoba Login!');
  };

  return (
    <div className="login-container">
      <motion.form
        className="login-form"
        onSubmit={handleSubmit}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {/* JUDUL */}
        <h2 className="form-title">Masuk</h2> 

        {/* 1. INPUT USERNAME/EMAIL */}
        <div className="form-group">
          {/* Label dihilangkan untuk tampilan yang ringkas seperti di gambar */}
          <div className="input-with-icon">
            <i className="fa fa-user icon"></i> {/* Ganti dengan <FaUser /> jika pakai React Icons */}
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
          </div>
        </div>

        {/* 2. INPUT PASSWORD */}
        <div className="form-group">
          <div className="input-with-icon">
            <i className="fa fa-lock icon"></i> {/* Ganti dengan <FaLock /> jika pakai React Icons */}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          {/* Lupa Password dipindahkan ke bawah input */}
          <p className="forgot-password">
            <a href="#">Forgot password?</a>
          </p>
        </div>

        {/* 3. TOMBOL LOGIN */}
        <motion.button
          type="submit"
          className="btn-login"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Masuk
        </motion.button>

        {/* 5. SIGN UP LINK */}
        <div className="signup-section">
          <p className="signup-text">Tidak Memiliki Akun?
          <a href="register" className="signup-link"> Daftar</a> </p>
        </div>

      </motion.form>
    </div>
  );
}

export default Login;