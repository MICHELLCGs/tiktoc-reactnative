import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = "http://localhost:5000/api";

//Login simulado


export const login = async (email, password) => {
  try {
    console.log('Intentando autenticar:', { email, password });

    // Obtener usuarios almacenados
    const storedUsers = await AsyncStorage.getItem('registeredUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Buscar usuario
    const user = users.find(u => u.email === email);

    if (user && user.password === password) {
      // Guardar sesión actual
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
      await AsyncStorage.setItem('token', 'fake-jwt-token');

      console.log('Inicio de sesión exitoso');
      return {
        user,
        token: 'fake-jwt-token'
      };
    } else {
      throw new Error('Credenciales inválidas');
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    throw error;
  }
};
  

/*export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Credenciales inválidas");
  }

  const data = await response.json();
  return data.token; // Retorna el token del backend
};*/


//Registro
export const register = async (userData) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData), // Enviar datos del usuario
  });

  if (!response.ok) {
    throw new Error("Error al registrar el usuario");
  }

  return response.json(); // Retorna la respuesta del backend
};

export const loadInitialState = async (setUser, setIsLoggedIn, setLoading) => {
    try {
      const [storedUser, token] = await Promise.all([
        AsyncStorage.getItem('currentUser'),
        AsyncStorage.getItem('token'),
      ]);
  
      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true); // Aquí aseguramos que se marque como logueado
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error loading initial state:', error);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };
/*  
export const loadInitialState = async (setUser, setIsLoggedIn, setLoading) => {
    try {
      // Intentar obtener el token desde AsyncStorage (si existe)
      const token = await AsyncStorage.getItem('token');
  
      if (token) {
        // Si hay un token, validar con el backend (opcional)
        const response = await fetch(`${BASE_URL}/auth/me`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.ok) {
          // Si el token es válido, actualizar el estado con los datos del usuario
          const userData = await response.json();
          setUser(userData);
          setIsLoggedIn(true);
        } else {
          // Si el token es inválido, eliminarlo y mantener el estado no logueado
          await AsyncStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      } else {
        // Si no hay token, simplemente mantener el estado de no logueado
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error loading initial state:', error);
    } finally {
      // Dejar de mostrar la pantalla de carga (si la tenías)
      setLoading(false);
    }
  };
  */