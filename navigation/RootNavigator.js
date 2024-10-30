import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../splash/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import DetailsScreen from '../stackscreens/DetailsScreen';
import Pruebas from '../stackscreens/Buscar';
import ProfileScreen from '../screens/ProfileScreen';

import LoginScreen from '../authentication/LoginScreen';
import { useAuth } from '../AuthContext';

import RegisterScreen from '../authentication/RegisterScreen';
import HomeLogin from '../authentication/HomeLogin';
import ValidCumple from '../authentication/ValidNacimiento';
const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator initialRouteName="Splash" >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={BottomTabNavigator} options={{ headerShown: false }} />

      
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
      
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }}/>
      {isLoggedIn ? (
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }}/>
      ) : (
        <>
          <Stack.Screen name="LoginHome" component={HomeLogin} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }}/>
          <Stack.Screen name="CumpleValid" component={ValidCumple} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerTransparent: true, headerTitle: '', headerBackTitle: 'Back' }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
