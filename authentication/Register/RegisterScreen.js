import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);

  const { register } = useAuth();

  useEffect(() => {
    setIsFormComplete(
      username.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      phone.trim().length >= 9
    );
  }, [username, email, password, phone]);

  const handleRegister = async () => {
    try {
      if (isFormComplete) {
        await register({ username, email, phone, password });
        navigation.navigate('Validation');
      } else {
        alert('Por favor, completa todos los campos.');
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <View style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.tituloconte}>
          <Text style={styles.prueba}>Registrarse</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.subtitulo}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            value={username}
            onChangeText={setUsername}
          />
          <Text style={styles.subtitulo}>Correo</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.subtitulo}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
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

        <View style={styles.boton_home_login}>
        <TouchableOpacity
          style={[styles.registerButton, isFormComplete ? styles.activeButton : styles.inactiveButton]}
          onPress={handleRegister}
          disabled={!isFormComplete}
        >
            <Text style={styles.registerButtonText}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: '#fff',
    paddingTop: 80,
    height: '100%',
  },
  container: {
    backgroundColor: 'transparent',
    height: '100%',
  },
  subtitulo: {
    marginBottom: 20,
  },
  tituloconte: {
    top: '5%',
    display: 'flex',
    marginBottom: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prueba: {
    backgroundColor: 'transparent',
    fontSize: 40,
    width: '80%',
    fontWeight: '500',
  },
  inputContainer: {
    marginTop: 20,
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    height: 40,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 4,
  },
  phonePrefix: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    height: 40,
    padding: 20,
  },
  boton_home_login: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#FF4500',
  },
  inactiveButton: {
    backgroundColor: '#D3D3D3',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default RegisterScreen;
