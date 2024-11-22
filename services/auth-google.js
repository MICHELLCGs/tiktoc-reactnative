import { GOOGLE_CLIENT_ID } from '@env';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session/providers/google';
import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

WebBrowser.maybeCompleteAuthSession();

const getLocalUser = async () => {
    try {
        // Recupera el JSON almacenado con la clave 'user'
        const jsonValue = await AsyncStorage.getItem('user');
        // Si existe, lo parsea y lo devuelve, si no, devuelve null
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log("Error retrieving local user:", error);
        return null;
    }
};

const getUserInfo = async (token) => {
    try {
        // Define la URL de la API de Google para obtener información del usuario
        const userInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';

        // Realiza la solicitud a la API con el token de autenticación en el encabezado
        const response = await fetch(userInfoUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }

        // Convierte la respuesta en JSON
        const userInfo = await response.json();

        // Devuelve la información del usuario
        return userInfo;
        
    } catch (error) {
        console.log("Error retrieving user info:", error);
        return null;
    }
};

export default function AuthGoogle() {
    const [authResponse, setAuthResponse] = React.useState(null);

    const [request, response, promptAsync] = AuthSession.useAuthRequest({
        clientId: GOOGLE_CLIENT_ID,
        scopes: ['openid', 'profile', 'email']
    });

    React.useEffect(() => {
        if (response?.type === "success") {
            handleSignInWithGoogle();
        }
    }, [response]);



 // Maneja la autenticación y recuperación de datos del usuario
 async function handleSignInWithGoogle() {
    // Obtiene el usuario almacenado localmente (si existe)
    const user = await getLocalUser();
    
    // Si no hay un usuario almacenado localmente, procede con la autenticación
    if (!user && response?.type === "success") {
        const { accessToken } = response.authentication || {}; // Obtiene el token de acceso

        // Verifica que el token de acceso exista antes de continuar
        if (accessToken) {
            console.log("User Token:", accessToken); // Imprime el token del usuario en la consola

            // Obtiene la información del usuario llamando a la función `getUserInfo` con el token
            const userInfo = await getUserInfo(accessToken);
            console.log("User Info:", userInfo); // Imprime la información del usuario en la consola

            // Guarda la información del usuario en AsyncStorage para uso futuro
            await AsyncStorage.setItem('user', JSON.stringify(userInfo));
            
            // Actualiza el estado `authResponse` con la información del usuario
            setAuthResponse(userInfo);
        } else {
            console.log("No access token found.");
        }
    } else if (user) {
        // Si el usuario ya está almacenado localmente, actualiza `authResponse` con la información local
        setAuthResponse(user);
    }
}

   
    
    return (
        <TouchableOpacity style={styles.boton_home} onPress={() => promptAsync()}>
            <Icon name="google" size={20} color="black" style={styles.icon} />
            <Text >Iniciar sesión con Google</Text>
        </TouchableOpacity>
    );
   
}

const styles = {
    boton_home: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 4,
        borderColor: 'black',
        borderWidth: 1,
        gap: 10,
        width: '80%',
        backgroundColor: 'transparent',
        marginTop: 20,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
};


