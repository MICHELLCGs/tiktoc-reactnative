import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../splash/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import DetailsScreen from '../screens/stackscreens/DetailsScreen';
import Pruebas from '../screens/stackscreens/Buscar';
import ProfileScreen from '../screens/ProfileScreen';

import Encuesta from '../components/Encuestas/encuesta';
import Pelicula from '../components/Encuestas/pelicula';
import Victoria from '../components/Encuestas/finalizacion';
import Derrota from '../components/Encuestas/derrota';
//nuevo
import EditProfileScreen from '../screens/EditProfileScreen';
//

import LoginScreen from '../authentication/Login/HomeLogin';
import { useAuth } from '../authentication/AuthContext';


import RegisterScreen from '../authentication/Register/RegisterScreen';
import HomeLogin from '../authentication/Login/LoginScreen';
import HomeRegister from '../authentication/Register/HomeRegister';
import ValidCumple from '../authentication/Register/ValidNacimiento';
import ValidationScreen from '../authentication/ValidationScreen';
import Monedas from '../screens/stackscreens/Monedas';
import Plataforma from '../components/plataforma';
import MovieUnlock from '../screens/stackscreens/MovieUnlock';



const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator initialRouteName="Splash">

      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Editar Perfil" component={EditProfileScreen} />

      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' ,headerTitleAlign: 'center',}} />
      
          <Stack.Screen name="Monedas" component={Monedas} options={{ headerTransparent: true, headerTitle: 'Monedas', headerBackTitle: 'Back' }} />
          <Stack.Screen name="Encuesta" component={Encuesta} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
          <Stack.Screen name="Pelicula" component={Pelicula} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
          <Stack.Screen name="Victoria" component={Victoria} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
          <Stack.Screen name="Derrota" component={Derrota} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
          <Stack.Screen name="Plataforma" component={Plataforma} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
          <Stack.Screen name="MovieUnlock" component={MovieUnlock} options={{ headerTransparent: true, headerTitle: 'Peliculas desbloqueadas', headerBackTitle: 'Back',headerTitleAlign: 'center', }} />
          <Stack.Screen name="Validation" component={ValidationScreen} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
      {isLoggedIn ? (
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
      ) : (
        <>
          <Stack.Screen name="HomeRegister" component={HomeRegister} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
          <Stack.Screen name="HomeLogin" component={HomeLogin} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
          {/*Componentes */}
          
          {/*Componentes */}
          <Stack.Screen name="CumpleValid" component={ValidCumple} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
          
          
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
