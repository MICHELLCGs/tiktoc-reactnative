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

  const logoAnimationHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Logo Animation</title>
      <style>
        body {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: white;
        }
        .logo {
          display: flex;
          font-size: 40px;
          font-weight: bold;
          font-family: Arial, sans-serif;
        }
        .letter {
          display: inline-block;
          transition: transform 0.3s;
        }
        .letter:hover {
          transform: scale(1.2);
        }
      </style>
    </head>
    <body>
      <div class="logo">
        <span class="letter">T</span>
        <span class="letter">i</span>
        <span class="letter">k</span>
        <span class="letter">o</span>
        <span class="letter">c</span>
      </div>

      <script>
        document.querySelectorAll('.letter').forEach(letter => {
          letter.addEventListener('mouseover', () => {
            letter.style.transform = 'scale(1.3)';
            setTimeout(() => {
              letter.style.transform = 'scale(1)';
            }, 300);
          });
        });
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container_spl}>
      <WebView
        originWhitelist={['*']}
        source={{ html: logoAnimationHTML }}
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

