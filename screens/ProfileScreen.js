import React from 'react';
import { View, Text, Button, StyleSheet ,TouchableOpacity} from 'react-native';
import { useAuth } from '../AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
const ProfileScreen = ({ navigation }) => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <View style={{backgroundColor:'transparent',flex: 1,alignItems: 'center',justifyContent:'center'}}>
      {isLoggedIn ? (
        <>

          <View style={{backgroundColor:'transparent',width:'100%',
            top: 50,
            position:'absolute',}}>

            <Text style={{display:'flex',
              flexDirection:'row',
              backgroundColor:'orange',
              height:55,
              width:'100%',
              position:'relative',
              zIndex:999}}>
      Bienvenido, {user?.name || 'Usuario'}</Text>
            <Button title="Cerrar sesión" onPress={logout} />


          </View>

          




        </>
      ) : (
        <>
        <View >
          <View style={styles.homelogin_s}>

          <Text style={{fontSize:20,width:'80%',textAlign:'center'}}>Debe iniciar sesión para ver su perfil.</Text>

            <TouchableOpacity style={styles.boton_home} onPress={() => navigation.navigate('LoginHome')}>
                
                <Icon name="user" size={20} color="black" style={styles.icon} />
                <Text style={styles.buttonTexts}>Iniciar sesión</Text>
            </TouchableOpacity>

          </View>
        </View>
          
          
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonTexts:{
    textAlign:'center',
    backgroundColor:'transparent',
    width:'95%',
    fontSize:17
  },
  boton_home:{
    display:'flex',
    flexDirection:'row',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    
    width:'80%',
    backgroundColor:'transparent',
    marginTop:20,
    padding:20,
    
    
},
  homelogin_s:{
    display:'flex',
    alignItems:'center',
    

    backgroundColor:'transparent',
    width:'100%',
    
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
