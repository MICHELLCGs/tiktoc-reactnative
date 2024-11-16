import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../splash/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import DetailsScreen from '../stackscreens/DetailsScreen';
import Pruebas from '../stackscreens/Buscar';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';

import LoginScreen from '../authentication/Login/LoginScreen';
import { useAuth } from '../authentication/AuthContext';

import RegisterScreen from '../authentication/Register/RegisterScreen';
import HomeLogin from '../authentication/Login/HomeLogin';
import HomeRegister from '../authentication/Register/HomeRegister';
import ValidCumple from '../authentication/Register/ValidNacimiento';
import ValidationScreen from '../authentication/ValidationScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isLoggedIn, isVerified } = useAuth(); // Asegúrate de extraer isVerified

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EditarPerfil" component={EditProfileScreen} />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerBackTitle: 'Back',
        }}
      />

      {isLoggedIn ? (
        isVerified ? (
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerBackTitle: 'Back',
            }}
          />
        ) : (
          <Stack.Screen
            name="Validation"
            component={ValidationScreen}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerBackTitle: 'Back',
            }}
          />
        )
      ) : (
        <>
          <Stack.Screen
            name="HomeRegister"
            component={HomeRegister}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="HomeLogin"
            component={HomeLogin}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="CumpleValid"
            component={ValidCumple}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="Validation"
            component={ValidationScreen}
            options={{
              headerTransparent: true,
              headerTitle: '',
              headerBackTitle: 'Back',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
