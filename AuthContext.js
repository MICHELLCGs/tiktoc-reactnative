// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  const login = ({ phone, email, password }) => {
    const registeredUser = registeredUsers.find(user => 
      (user.phone === phone || user.email === email) && user.password === password
    );

    if (registeredUser) {
      setUser(registeredUser);
      setIsLoggedIn(true);
    } else {
      alert('Credenciales inválidas');
    }
  };

  const register = (userData) => {
    setRegisteredUsers(prev => [...prev, userData]);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateUserProfile = (updatedInfo) => {
    setUser(prevUser => ({ ...prevUser, ...updatedInfo }));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
