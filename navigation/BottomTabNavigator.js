import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../authentication/LoginScreen'; // Asegúrate de importar el LoginScreen
import { useAuth } from '../AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
         // Ocultar etiquetas de texto si solo quieres iconos
         tabBarActiveTintColor: '#ed7043', // Color cuando la pestaña está seleccionada
        tabBarInactiveTintColor: '#282929', // Color cuando la pestaña no está seleccionada
        tabBarStyle: {
          paddingHorizontal: 50, // Espacio horizontal para los íconos
          height: 60, // Aumenta la altura de la barra de pestañas
          paddingBottom: 5, // Espacio para los iconos
          backgroundColor: 'white', // Color de fondo de la barra de pestañas
        },
        tabBarLabelStyle: {
          fontSize: 12, // Cambia este valor al tamaño deseado
          fontWeight: 'bold', // Puedes ajustar el grosor del texto si lo deseas
        },
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Inicio' ,
          tabBarIcon: ({ color}) => (
            <Icon name="home" color={color} size={32} />
          ),
        }} />
      <Tab.Screen name="Buscar" component={SearchScreen} options={{title: 'Busqueda' ,
          tabBarIcon: ({ color}) => (
            <Icon name="search" color={color} size={28} />
          ),
        }} />
      <Tab.Screen
        name="Perfil"
        component={isLoggedIn ? ProfileScreen : ProfileScreen} // Muestra ProfileScreen si está logueado, de lo contrario, LoginScreen
        

        options={{title: 'Perfil' ,
          tabBarIcon: ({ color}) => (
            <Icon name="user" color={color} size={28} />
          ),
        }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;