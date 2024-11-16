import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../authentication/AuthContext';

const ValidationScreen = ({ navigation }) => {
  const { validateCode, isVerified } = useAuth(); // Obtén la función y el estado de verificación del código
  const [code, setCode] = useState('');  // Almacenamos el código ingresado por el usuario

  const handleValidation = () => {
    validateCode(code); // Valida el código usando la función del contexto
  };

  // Si el código es validado, redirige a la pantalla de perfil
  if (isVerified) {
    navigation.navigate('Profile'); // Redirige a la pantalla de perfil
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verifica tu cuenta</Text>
      <Text style={styles.subtitle}>Ingresa el código de verificación</Text>
      <TextInput
        style={styles.input}
        placeholder="Código"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleValidation}>
        <Text style={styles.buttonText}>Validar</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF4500',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ValidationScreen;
