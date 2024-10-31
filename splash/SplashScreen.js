import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Después de 3 segundos, navega a Home
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container_spl}>
      <WebView
        source={{ uri: 'file:///asset/LogoAnimation.html' }}
        style={styles.webView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container_spl: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  webView: {
    width: 200, // Ajusta el tamaño según lo necesario
    height: 200,
    backgroundColor: 'transparent',
  },
});

export default SplashScreen;

