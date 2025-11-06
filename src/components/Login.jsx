import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; 
import './Login.css';


function Login() {
    const navigate = useNavigate();
    const { login } = useAuth(); // Ambil fungsi login dari AuthContext
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setError(''); 

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST', 
                
                headers: {
                    'Content-Type': 'application/json',
                },
                
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                // Login sukses
                if (data.username) {
                    login(data.username); // Panggil fungsi login yang menyimpan ke localStorage
                    navigate('/'); 
                } else {
                    console.error("Login berhasil tetapi backend tidak mengirimkan username.");
                    setError("Login berhasil, tetapi terjadi kesalahan data.");
                }
            } else {
                // Login gagal
                setError(data.message || "Gagal Login. Silakan periksa kredensial Anda.");
            }
        } catch (fetchError) {
            console.error('Terjadi kesalahan saat mencoba login:', fetchError);
            setError('Gagal terhubung ke server. Pastikan server backend berjalan di Port 5000.');
        }
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
                <h2 className="form-title">Masuk</h2> 

                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>} 

                <div className="form-group">
                    <div className="input-with-icon">
                        <i className="fa fa-user icon"></i> 
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

                <div className="form-group">
                    <div className="input-with-icon">
                        <i className="fa fa-lock icon"></i> 
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
                    </div>
                    <p className="forgot-password">
                        <a href="#">Forgot password?</a>
                    </p>
                </div>

                <motion.button
                    type="submit"
                    className="btn-login"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Masuk
                </motion.button>

                <div className="signup-section">
                    <p className="signup-text">Tidak Memiliki Akun?
                    <a href="/register" className="signup-link"> Daftar</a> </p>
                </div>

            </motion.form>
        </div>
    );
}

export default Login;