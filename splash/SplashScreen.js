import React, { useEffect } from 'react';
import { View, Text, StyleSheet , Image } from 'react-native';
import Logo from '../assets/Logo/Tiktoc.png'; // Ajusta la ruta según sea necesario

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Después de 3 segundos, navega a Home
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container_spl}>
      
      <Image style={styles.logotipo} source={Logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  logotipo:{

  },
  container_spl: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
