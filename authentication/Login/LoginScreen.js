import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={styles.safe}>
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.inputContainer}>
      <Text style={styles.subtitulo} >Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={email}
          onChangeText={setEmail}
        />

         <Text style={styles.subtitulo} >Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <Text style={styles.subtitulo}>Teléfono</Text>
        <View style={styles.phoneContainer}>
          <Text style={styles.phonePrefix}>+51</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Número de teléfono"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            maxLength={9}
          />
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.botonsiguiente}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safe:{
    backgroundColor: '#fff',
    paddingTop:40
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 30,
  },
  subtitulo: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    height: 40,
  },
  subtitulo: {
    marginBottom:20
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 4,
    alignContent:'center',
    textAlign:'center'
  },
  phonePrefix: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    height: 40, 
    padding: 20,
    color: '#ccc'
  },
  botonsiguiente: {
    backgroundColor: '#FF4500',
    width: '80%',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default LoginScreen;
