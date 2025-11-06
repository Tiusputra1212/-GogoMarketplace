import React, { createContext, useContext, useState, useEffect } from 'react';

// Fungsi untuk mengambil user dari localStorage saat aplikasi dimulai
const getInitialUser = () => {
    // Kunci 'user' harus sama dengan yang digunakan di CardSection.jsx
    const user = localStorage.getItem('user'); 
    return user || null;
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // State menyimpan user yang sedang login
    const [user, setUser] = useState(getInitialUser);

    // Fungsi LOGIN: Menyimpan username ke state dan localStorage
    const login = (username) => {
        if (username) {
            setUser(username);
            // 💡 BAGIAN PENTING: Menyimpan data ke localStorage
            localStorage.setItem('user', username);
            
            // Memicu event 'storage' global agar CardSection.jsx dapat merespons real-time
            window.dispatchEvent(new Event('storage')); 
        }
    };

    // Fungsi LOGOUT: Menghapus user dari state dan localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('storage'));
    };

    const value = {
        user,
        isLoggedIn: !!user, // Status boolean: true jika user ada, false jika null
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Pastikan Anda membungkus root komponen Anda (misal App.jsx) dengan <AuthProvider>