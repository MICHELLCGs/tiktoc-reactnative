import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useAuth } from '../authentication/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = ({ navigation }) => {
  const { isLoggedIn, user, logout } = useAuth();
  const [profileImage, setProfileImage] = useState(null); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.assets) {
        setProfileImage(response.assets[0].uri); 
      }
    });
  };
  
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  const handleLogout = () => {
    logout(); 
  };

  const handleEditProfile = () => {
    navigation.navigate('Editar Perfil'); 
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          {/* Barra superior con los iconos */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={25} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMenuToggle}>
              <Icon name="bars" size={25} color="black" />
            </TouchableOpacity>
            {isMenuOpen && (
              <View style={styles.menu}>
                <TouchableOpacity onPress={handleEditProfile}>
                  <Text>Editar perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                  <Text>Cerrar sesión</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Imagen de perfil - Sin TouchableOpacity para evitar interacción */}
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/default-avatar.png')} // Imagen de perfil por defecto
            style={styles.profileImage}
          />

          {/* Nombre de usuario */}
          <Text style={styles.userName}>
            {user?.name || 'Usuario'}{user?.nickname ? ` (@${user.nickname})` : ' (@nicknameunico)'}
          </Text>

          {/* Información adicional */}
          <Text style={styles.level}>Nivel: Principiante</Text>

          <View style={styles.horizontalLine} />

          {/* Iconos de monedas y encuestas */}
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
            <Icon name="gg-circle" size={25} color="black" />
              <Text>Monedas: 0</Text>
            </View>
            <View style={styles.stat}>
              <Icon name="check-square" size={25} color="black" />
              <Text>Encuestas hechas: 0</Text>
            </View>
          </View>

          <View style={styles.horizontalLine} />

          {/* Interacciones (Me gusta y Encuestas completadas) */}
          <View style={styles.interactionsContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('LikedVideos')}>
              <Icon name="heart" size={30} color="red" />
              <Text>Me gusta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CompletedSurveys')}>
              <Icon name="clipboard" size={30} color="blue" />
              <Text>Encuestas</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.homelogin_s}>
            <Text style={{fontSize:20,width:'80%',textAlign:'center'}}>Debe registrarse para poder acceder a más funciones</Text>
            <TouchableOpacity style={styles.boton_home} onPress={() => navigation.navigate('HomeRegister')}>
              <Icon name="user" size={20} color="black" style={styles.icon} />
              <Text style={styles.buttonTexts}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    top: 50,
    padding: 10,
    zIndex: 999,
  },
  menu: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FF4500',
    marginTop: 120, 
  },
  userName: {
    fontSize: 20,
    marginTop: 20, 
    textAlign: 'center',
  },
  level: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#FF4500',
    width: '80%',
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  stat: {
    alignItems: 'center',
  },
  interactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconButton: {
    alignItems: 'center',
    padding: 10,
  },
  homelogin_s: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: 'transparent',
    width: '100%',
    flex: 1, 
  },
  loginText: {
    fontSize: 20,
    width: '80%',
    textAlign: 'center',
  },
  boton_home: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
    backgroundColor: 'transparent',
    marginTop: 20,
    padding: 20,
  },
  buttonTexts: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    width: '95%',
    fontSize: 17,
  },
});

export default ProfileScreen;
