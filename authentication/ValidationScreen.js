import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../authentication/AuthContext';

const ValidationScreen = ({ navigation }) => {
  const { validateCode, isVerified } = useAuth();
  const [code, setCode] = useState('');

  useEffect(() => {
    if (isVerified) {
      navigation.navigate('Profile');
    }
  }, [isVerified]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifica tu cuenta</Text>
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity style={styles.button} onPress={() => validateCode(code)}>
        <Text style={styles.buttonText}>Validar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ValidationScreen;
