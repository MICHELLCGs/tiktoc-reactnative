import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../AuthContext';

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, registeredUser } = useAuth();

  const handleLogin = () => {
    // Aquí debes validar la información de inicio de sesión
    const user = { phone, email, password }; // Datos de inicio de sesión

    if (validateUser(user)) { // Valida el usuario registrado (implementa esta función)
      login(user);
      navigation.navigate('Perfil'); // Redirige a la pantalla de perfil
    } else {
      alert('Teléfono, correo o contraseña incorrectos.'); // Mensaje de error si el usuario no coincide
    }
  };

  const validateUser = ({ phone, email, password }) => {
    // Aquí debes implementar la lógica para verificar el teléfono, correo y contraseña del usuario
    // Ejemplo: comparar con los datos almacenados en tu AuthContext o una base de datos
    return true; // Cambia esto según tu lógica de validación
  };

  return (
    <View style={styles.container}>
      <Text>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Siguiente" onPress={handleLogin} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
  },
});

export default LoginScreen;
