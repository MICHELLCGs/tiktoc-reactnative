import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]); // Para almacenar los usuarios registrados

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
    setRegisteredUsers(prev => [...prev, userData]); // Agregar nuevo usuario al registro
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
