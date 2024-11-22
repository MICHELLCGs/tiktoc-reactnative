import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useAuth } from './AuthContext';

const ValidationScreen = ({ navigation }) => {
  const { validateCode, isVerified } = useAuth();
  const [code, setCode] = useState('');

  useEffect(() => {
    console.log("isVerified cambió:", isVerified);
    if (isVerified) {
      navigation.goBack();
    }
  }, [isVerified]);

  const handleValidation = async () => {
    try {
      await validateCode(code); // Llama a la función validateCode del contexto
      Alert.alert('Éxito', 'Código validado correctamente');
    } catch (error) {
      Alert.alert('Error', 'El código ingresado es incorrecto');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.title}>Verifica tu cuenta</Text>
        <Text style={styles.title2}>Ingresar código de Validación</Text>
        <TextInput
          style={styles.input}
          placeholder="Código"
          value={code}
          onChangeText={setCode}
        />
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={styles.linkk}>¿No recibiste el código? </Text>
          <TouchableOpacity>
            <Text style={[styles.linkk, { color: 'red' }]}> Reenviar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleValidation}>
          <Text style={styles.buttonText}>Verificar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white',
    display:'flex',
    alignItems:'center'
  },
  linkk:{
    backgroundColor:'white',
    padding:5,
    top:15,
    fontWeight:'500',
    
  },
  container2:{
    top:100,
    backgroundColor:'white',
    width:'80%',
    height:'50%'
  },
  title:{
    textAlign:'center',
    padding:20,
    fontSize:20,
    fontWeight:'600'
  },
  title2:{
    backgroundColor:'white',
    padding:7,
    fontSize:15,
    fontWeight:'600'
  },
  input:{
    backgroundColor:'white',
    padding:10
  },
  button:{
    position:'absolute',
    bottom:0,
    backgroundColor:'white',
    width:'100%',
    justifyContent:'center',
    display:'flex',
    alignItems:'center'
  },
  buttonText:{
    backgroundColor:'#FF4500',
    color:'white',
    width:'50%',
    textAlign:'center',
    padding:8,
    fontWeight:'500'
  }
});
export default ValidationScreen;
