import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as loginService, register as registerService ,loadInitialState } from "../services/Login/authService";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Usuario autenticado
  const [token, setToken] = useState(null); // Token de autenticación

  //
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  // Cargar estado inicial al montar el componente
  useEffect(() => {
    // Cargar usuarios registrados al iniciar
    const loadRegisteredUsers = async () => {
      try {
        const stored = await AsyncStorage.getItem('registeredUsers');
        if (stored) {
          setRegisteredUsers(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading registered users:', error);
      }
    };

    loadRegisteredUsers();
    loadInitialState(setUser, setIsLoggedIn, setLoading);
  }, []);

  
  

  const login = async (username, password) => {
    try {
      const token = await loginService(username, password); // Llamar al servicio
      setToken(token); // Guardar el token
      setUser({ username }); // Guardar los datos del usuario
      setIsLoggedIn(true); // Marcar como logueado
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
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
      setToken(null); // Limpiar token
      return true;
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  };

// En AuthContext.js
const register = async (userData) => {
  try {
    // Verificar si el usuario ya existe
    const userExists = registeredUsers.some(
      user => user.email === userData.email
    );

    if (userExists) {
      throw new Error('El usuario ya existe');
    }

    const newUser = { 
      ...userData, 
      isVerified: false,
      id: Date.now().toString(),
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

    return { success: true, user: newUser };
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
};


  // Inicio de sesión
  /*const login = async (credentials) => {
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
*/
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
  /*const logout = async () => {
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
*/


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
    token,
    isVerified,
    //loading,
    isLoggedIn,
    register,
    login,
    logout,
    validateCode,
    //updateUserProfile
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