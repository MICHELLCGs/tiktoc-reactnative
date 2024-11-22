import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar estado inicial al montar el componente
  useEffect(() => {
    loadInitialState();
  }, []);

  const loadInitialState = async () => {
    try {
      const [storedUsers, storedUser, verificationStatus] = await Promise.all([
        AsyncStorage.getItem('registeredUsers'),
        AsyncStorage.getItem('currentUser'),
        AsyncStorage.getItem('isVerified')
      ]);

      if (storedUsers) {
        setRegisteredUsers(JSON.parse(storedUsers));
      }

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsLoggedIn(true);
        setIsVerified(verificationStatus === 'true');
      }
    } catch (error) {
      console.error('Error loading initial state:', error);
    } finally {
      setLoading(false);
    }
  };

  // Registro de usuario
  const register = async (userData) => {
    try {
      // Verificar si el usuario ya existe
      const userExists = registeredUsers.some(
        user => user.email === userData.email || user.phone === userData.phone
      );

      if (userExists) {
        throw new Error('El usuario ya existe');
      }

      const newUser = { 
        ...userData, 
        isVerified: false,
        id: Date.now().toString(), // Generamos un ID único
        createdAt: new Date().toISOString()
      };

      const updatedUsers = [...registeredUsers, newUser];
      
      // Actualizar estado y AsyncStorage
      await Promise.all([
        AsyncStorage.setItem('registeredUsers', JSON.stringify(updatedUsers)),
        AsyncStorage.setItem('currentUser', JSON.stringify(newUser))
      ]);

      setRegisteredUsers(updatedUsers);
      setUser(newUser);
      setIsLoggedIn(true);
      setIsVerified(false);

      return true;
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  // Inicio de sesión
  const login = async (credentials) => {
    try {
      const matchedUser = registeredUsers.find(
        user => (user.email === credentials.email || user.phone === credentials.phone) 
              && user.password === credentials.password
      );

      if (!matchedUser) {
        throw new Error('Credenciales inválidas');
      }

      // Actualizar estado y AsyncStorage
      await AsyncStorage.setItem('currentUser', JSON.stringify(matchedUser));
      setUser(matchedUser);
      setIsLoggedIn(true);
      setIsVerified(matchedUser.isVerified);

      return matchedUser;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  // Validación de código
  const validateCode = async (code) => {
    try {
      const expectedCode = '1234'; // En producción, esto debería ser generado y enviado al usuario

      if (code !== expectedCode) {
        throw new Error('Código incorrecto');
      }

      // Actualizar usuario verificado
      const updatedUser = { ...user, isVerified: true };
      const updatedUsers = registeredUsers.map(u => 
        u.id === user.id ? updatedUser : u
      );

      // Actualizar estado y AsyncStorage
      await Promise.all([
        AsyncStorage.setItem('isVerified', 'true'),
        AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser)),
        AsyncStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
      ]);

      setUser(updatedUser);
      setIsVerified(true);
      setRegisteredUsers(updatedUsers);

      return true;
    } catch (error) {
      console.error('Error en validación:', error);
      throw error;
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      // Limpiar AsyncStorage y estado
      await Promise.all([
        AsyncStorage.removeItem('currentUser'),
        AsyncStorage.removeItem('isVerified')
      ]);

      setUser(null);
      setIsLoggedIn(false);
      setIsVerified(false);

      return true;
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  };

  // Actualizar perfil de usuario
  const updateUserProfile = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      const updatedUsers = registeredUsers.map(u => 
        u.id === user.id ? updatedUser : u
      );

      // Actualizar estado y AsyncStorage
      await Promise.all([
        AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser)),
        AsyncStorage.setItem('registeredUsers', JSON.stringify(updatedUsers))
      ]);

      setUser(updatedUser);
      setRegisteredUsers(updatedUsers);

      return true;
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      throw error;
    }
  };

  const contextValue = {
    user,
    isLoggedIn,
    isVerified,
    loading,
    register,
    login,
    logout,
    validateCode,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;