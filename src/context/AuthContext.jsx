import React, { createContext, useContext, useState, useEffect } from 'react';
const getInitialUser = () => {
    const user = localStorage.getItem('user'); 
    return user || null;
};
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getInitialUser);
    const login = (username) => {
        if (username) {
            setUser(username);
            localStorage.setItem('user', username);
            window.dispatchEvent(new Event('storage')); 
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('storage'));
    };
    const value = {
        user,
        isLoggedIn: !!user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};