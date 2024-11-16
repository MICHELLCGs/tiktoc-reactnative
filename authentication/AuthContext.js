import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para React Native

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // Añadir estado de verificación
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Cargar los usuarios registrados de AsyncStorage al inicio
  useEffect(() => {
    const loadRegisteredUsers = async () => {
      const users = await AsyncStorage.getItem('registeredUsers');
      if (users) {
        setRegisteredUsers(JSON.parse(users));
      }
    };
    loadRegisteredUsers();
  }, []);

  // Función de login
  const login = ({ phone, email, password }) => {
    const registeredUser = registeredUsers.find(user => 
      (user.phone === phone || user.email === email) && user.password === password
    );

    if (registeredUser) {
      setUser(registeredUser);
      setIsLoggedIn(true);
      setIsVerified(registeredUser.isVerified); // Se asume que el usuario tiene un campo de verificación
    } else {
      alert('Credenciales inválidas');
    }
  };

  // Función de registro
  const register = async (userData) => {
    setRegisteredUsers(prev => {
      const newUsers = [...prev, userData];
      AsyncStorage.setItem('registeredUsers', JSON.stringify(newUsers)); // Guarda los usuarios en AsyncStorage
      return newUsers;
    });
    setUser(userData);
    setIsLoggedIn(true);
    setIsVerified(userData.isVerified); // Se asume que el usuario tiene un campo de verificación
  };

  // Función de logout
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsVerified(false); // Al hacer logout, también se resetearía el estado de verificación
  };

  // Función para actualizar el perfil del usuario
  const updateUserProfile = (updatedInfo) => {
    setUser(prevUser => {
      const updatedUser = { ...prevUser, ...updatedInfo };
      AsyncStorage.setItem('registeredUsers', JSON.stringify(
        registeredUsers.map(u => (u.phone === updatedUser.phone ? updatedUser : u))
      ));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isVerified, user, login, register, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
