import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,SafeAreaView } from 'react-native';
import { useAuth } from '../AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';


// Función para cargar las fuentes


const HomeLogin = ({ navigation }) => {
   // Cargar las fuentes directamente en useFonts
 

  const [username, setUsername] = useState('');
  const { login, registeredUser } = useAuth();

  const handleLogin = () => {
    if (username === registeredUser) { // Compara con el usuario registrado
      login({ name: username });
      navigation.navigate('Perfil');
    } else {
      alert('Usuario no encontrado.'); // Mensaje de error si el usuario no coincide
    }
  };

  return (
    <View style={styles.safe}>
        
        <View style={styles.container}>
            
            <View style={styles.tituloconte} >
                <Text style={styles.prueba}>Inicio de sesión en Tiktoc</Text>
            </View>

            <View style={styles.boton_home_login}>
                <TouchableOpacity style={styles.boton_home} onPress={() => navigation.navigate('Login')}>
                    
                    <Icon name="user" size={20} color="black" style={styles.icon} />
                    <Text style={styles.buttonText}>Use phone or email</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.boton_home_login}>
                <TouchableOpacity style={styles.boton_home} onPress={() => alert('Continue with Google')}>
                    <Icon name="google" size={20} color="black" style={styles.icon} />
                    <Text style={styles.buttonText}>Continue with Google</Text>
                </TouchableOpacity>
            </View>   
                
            <View style={styles.terminos}>
                <Text style={styles.terminos_int}>Al continuar, aceptas nuestros Términos de Servicio y reconoces que has leído nuestra Política de Privacidad para saber cómo recopilamos, usamos y compartimos tus datos, y nuestra </Text>
                <Text style={styles.terminos_int}>Política de Cookies para saber cómo usamos las cookies.</Text>
            </View>
                
                
            <View style={styles.bottomButtonContainer}>
                <TouchableOpacity style={styles.Registro_boton} onPress={() => navigation.navigate('CumpleValid')}>
                    <Text style={styles.registerText}>No tienes una cuenta?</Text>
                    <Text style={[styles.registerText,{color:'FF4500'}]}>Registrate</Text>
                </TouchableOpacity>
            </View>
                    
        </View>
    </View>
  );
};


const styles = StyleSheet.create({
    registerText:{
        fontWeight:'600'
    },
    bottomButtonContainer: {
        position:'absolute',
        backgroundColor:'transparent',
        padding:10,
        width:'100%',
        display:'flex',
        alignItems: 'center',
        bottom: 50, // Espacio desde el borde inferior
      },
    Registro_boton:{
        display:'flex',
        flexDirection:'row',
        gap:5,
        backgroundColor:'transparent',
        
    },
    terminos:{
        position:'absolute',
        display:'flex',
        alignItems:'center',
        bottom:100,
        width:'100%'
    },
    terminos_int:{
        width:'85%',
        textAlign:'justify',
        backgroundColor:'transparent',
        marginTop:5,
        fontSize:15
    },
    buttonText:{
        color:'black',
        fontWeight:'400'
    },
    boton_home:{
        display:'flex',
        flexDirection:'row',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        gap:55,
        width:'80%',
        backgroundColor:'transparent',
        marginTop:20,
        padding:20,
        
        
    },
    boton_home_login:{
        top:'10%',
        display:'flex',
        alignItems:'center',
        backgroundColor:'transparent'
    },
    container:{
        backgroundColor:'transparent',
        height:'100%'

    },
    safe:{ 
        backgroundColor: 'transparent',paddingTop: 80, height:'100%' 
    },
    prueba:{
        backgroundColor:'transparent',
        fontSize:40,
        width:'80%',
        fontWeight:'500'
        

    },
    tituloconte:{
        top:'5%',
        display:'flex',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        
    }
});

export default HomeLogin;