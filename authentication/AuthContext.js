import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Cargar los usuarios registrados y el estado de verificación al inicio
  useEffect(() => {
    const loadData = async () => {
      const users = await AsyncStorage.getItem('registeredUsers');
      const verified = await AsyncStorage.getItem('isVerified');
      if (users) setRegisteredUsers(JSON.parse(users));
      setIsVerified(verified === 'true');
    };
    loadData();
  }, []);

  // Función de login
  const login = ({ phone, email, password }) => {
    const registeredUser = registeredUsers.find(
      (user) =>
        (user.phone === phone || user.email === email) &&
        user.password === password
    );

    if (registeredUser) {
      setUser(registeredUser);
      setIsLoggedIn(true);
      setIsVerified(registeredUser.isVerified || false);
    } else {
      alert('Credenciales inválidas');
    }
  };

  // Función de registro
  const register = async (userData) => {
    const newUsers = [...registeredUsers, { ...userData, isVerified: false }];
    setRegisteredUsers(newUsers);
    setUser(userData);
    setIsLoggedIn(true);
    setIsVerified(false); // El usuario registrado aún no está verificado
    await AsyncStorage.setItem('registeredUsers', JSON.stringify(newUsers));
  };

  // Función para validar el código de verificación
  const validateCode = async (code) => {
    const expectedCode = '1234'; // Código de verificación esperado
    if (code === expectedCode) {
      setIsVerified(true);
      await AsyncStorage.setItem('isVerified', 'true');
    } else {
      alert('Código incorrecto');
    }
  };

  // Función de logout
  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsVerified(false);
    await AsyncStorage.removeItem('isVerified'); // Eliminar estado de verificación al salir
  };

  // Función para actualizar el perfil del usuario
  const updateUserProfile = (updatedInfo) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...updatedInfo };
      setRegisteredUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.phone === updatedUser.phone ? updatedUser : u
        )
      );
      AsyncStorage.setItem(
        'registeredUsers',
        JSON.stringify(
          registeredUsers.map((u) =>
            u.phone === updatedUser.phone ? updatedUser : u
          )
        )
      );
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isVerified,
        user,
        login,
        register,
        logout,
        updateUserProfile,
        validateCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
