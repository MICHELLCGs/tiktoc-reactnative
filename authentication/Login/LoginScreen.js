import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useAuth } from '../AuthContext';


const LoginScreen = ({ navigation }) => {
  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    email: '',     // Cambiado de username a email para consistencia
    password: '',
  });

  // Estados para el manejo de errores y carga
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Obtener la función login del contexto de autenticación
  const { login } = useAuth();

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};

    // Validar email
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Redirigir a la pantalla "Validation" si el formulario es válido
      navigation.navigate('Validation');
    }
  };

  // Manejar cambios en los inputs
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Manejar el envío del formulario
  const handleLogin = async () => {
    if (!validateForm()) return;
    try {

      console.log('Intentando iniciar sesión con::::::', formData);
  
      const result = await login(formData.email, formData.password);
      if (!result) {
        console.log('Login exitoso: no quieress', result);
        navigation.navigate('Validation');
      }
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      Alert.alert(
        'Error de inicio de sesión',
        error.message || 'Credenciales incorrectas. Por favor, intenta de nuevo.'
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>

          {/* Campo de email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Correo electrónico"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Campo de contraseña */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Contraseña"
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
              secureTextEntry
              editable={!isLoading}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Botón de inicio de sesión */}
          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>

          {/* Link para registro */}
          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}
            disabled={isLoading}
          >
            <Text style={styles.registerLinkText}>
              ¿No tienes cuenta? Regístrate
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
},
scrollContainer: {
  flexGrow: 1,
  justifyContent: 'center',
},
formContainer: {
  padding: 20,
  width: '100%',
  maxWidth: 400,
  alignSelf: 'center',
},
title: {
  fontSize: 24,
  fontWeight: '600',
  marginBottom: 30,
  textAlign: 'center',
},
inputContainer: {
  marginBottom: 20,
},
label: {
  fontSize: 16,
  marginBottom: 8,
  fontWeight: '500',
},
input: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
  backgroundColor: '#fff',
},
inputError: {
  borderColor: '#ff4444',
},
phoneContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
phonePrefix: {
  fontSize: 16,
  marginRight: 10,
  fontWeight: '600',
},
phoneInput: {
  flex: 1,
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
},
errorText: {
  color: '#ff4444',
  fontSize: 12,
  marginTop: 4,
},
loginButton: {
  backgroundColor: '#FF4500',
  padding: 15,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 20,
},
loginButtonDisabled: {
  backgroundColor: '#ffaa80',
},
loginButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
registerLink: {
  marginTop: 20,
  alignItems: 'center',
},
registerLinkText: {
  color: '#FF4500',
  fontSize: 14,
  fontWeight: '500',
},
});

export default LoginScreen;