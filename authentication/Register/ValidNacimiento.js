import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { useAuth } from '../AuthContext';
import CakeImage from '../../assets/img/cake.png';

const ValidNacimiento = ({ navigation }) => {
  const [birthDate, setBirthDate] = useState('');




  const isValidDate = (date) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; 
    return regex.test(date);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrarse</Text>
        <View style={styles.birthContainer}>
          <Text style={styles.birthText}>¿Cuál es tu fecha de nacimiento?</Text>
          <Image source={CakeImage} style={styles.cakeImage} />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Fecha de nacimiento (DD/MM/AAAA)"
          value={birthDate}
          onChangeText={setBirthDate}
        />
        <TouchableOpacity
          style={[styles.botonsiguiente, !isValidDate(birthDate) && styles.disabledButton]}
          onPress={() => navigation.navigate('Register')}
          disabled={!isValidDate(birthDate)}
        >
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    marginTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 35,
  },
  birthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
    marginBottom: 20, 
    paddingHorizontal: 20,
  },
  cakeImage: {
    width: 70, 
    height: 65, 
    marginRight: 15,
  },
  birthText: {
    fontSize: 18,
    flex: 1, 
    flexWrap: 'wrap', 
    textAlign: 'left',
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 20,
  },
  botonsiguiente: {
    backgroundColor: '#FF4500',
    padding: 10,
    alignItems: 'center',
    width: '80%',
    marginTop:20
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ValidNacimiento;
