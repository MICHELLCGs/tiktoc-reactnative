import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // Después de 3 segundos, navega a Home
    setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
  }, [navigation]);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 1.3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderLetter = (letter) => (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      key={letter}
    >
      <Animated.Text style={[styles.letter, { transform: [{ scale: scaleAnim }] }]}>
        {letter}
      </Animated.Text>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container_spl}>
      <View style={styles.logo}>
        {['T', 'i', 'k', 'o', 'c'].map(renderLetter)}
      </View>
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
  logo: {
    flexDirection: 'row',
  },
  letter: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    marginHorizontal: 2,
  },
});

export default SplashScreen;


