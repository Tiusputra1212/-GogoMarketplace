// /src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Gunakan state untuk menyimpan status dan username
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);

    // Fungsi login: Menerima username dan menyimpannya
    const login = (name) => {
        setIsLoggedIn(true);
        setUsername(name); // 🔑 KRITIS: Simpan nama pengguna di state
        // Anda juga bisa menyimpan ke localStorage di sini jika perlu
    };

    // Fungsi logout
    const logout = () => {
        setIsLoggedIn(false);
        setUsername(null);
        // Hapus data dari localStorage di sini jika ada
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); // Custom Hook