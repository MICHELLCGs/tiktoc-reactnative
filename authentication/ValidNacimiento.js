import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../AuthContext';

const ValidNacimiento = ({ navigation }) => {
  
  const [birthDate, setBirthDate] = useState('');
  const { register } = useAuth();

  const handleRegister = () => {
    register({birthDate }); // Llama a la función de registro
    navigation.navigate('Register'); // Redirige a la pantalla de perfil
  };

  return (
    <View style={styles.container}>
      <Text>Registrarse</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Fecha de nacimiento (DD/MM/AAAA)"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      
      <Button title="Siguiente" onPress={handleRegister} />
      
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

export default ValidNacimiento;
