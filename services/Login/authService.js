import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';


export const login = async (email, password) => {
  try {
    console.log('Intentando autenticar:', { email, password });

    // Enviar solicitud POST al backend para autenticar al usuario
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Credenciales inválidas');
    }

    const data = await response.json();

    // Guardar sesión actual
    await AsyncStorage.setItem('currentUser', JSON.stringify(data.user));
    await AsyncStorage.setItem('token', data.token);  // Suponiendo que la API devuelve un token

    console.log('Inicio de sesión exitoso');
    return {
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    throw error;
  }
};

/*export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
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
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error al registrar el usuario');
    }

    const data = await response.json();

    // Aquí puedes hacer algo adicional si es necesario, como guardar el token
    // y el usuario autenticado
    await AsyncStorage.setItem('currentUser', JSON.stringify(data.user));
    await AsyncStorage.setItem('token', data.token);

    return data;  // Retorna la respuesta con el usuario y el token
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    throw error;
  }
};
/*  
export const loadInitialState = async (setUser, setIsLoggedIn, setLoading) => {
    try {
      // Intentar obtener el token desde AsyncStorage (si existe)
      const token = await AsyncStorage.getItem('token');
  
      if (token) {
        // Si hay un token, validar con el backend (opcional)
        const response = await fetch(`${API_URL}/auth/me`, {
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