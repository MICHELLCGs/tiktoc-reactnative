import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useAuth } from '../authentication/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = ({ navigation }) => {
  const { isLoggedIn, user, logout } = useAuth();
  const [profileImage, setProfileImage] = useState(null);
  const [activeTab, setActiveTab] = useState('likes');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Datos ficticios para las imágenes y encuestas
  const likedImages = [
    { id: '1', src: require('../assets/img/imagen1.png') },
    { id: '2', src: require('../assets/img/imagen1.png') },
    { id: '3', src: require('../assets/img/imagen1.png') },
    { id: '4', src: require('../assets/img/imagen1.png') },
  ];

  const surveys = [
    {
      id: '1',
      title: 'Película #1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: require('../assets/img/imagen1.png'),
    },
    {
      id: '2',
      title: 'Película #2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: require('../assets/img/imagen1.png'),
    },
  ];

  // Función para manejar la selección de imagen de perfil
  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  // Función para alternar el estado del menú
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };

  // Función para redirigir a la pantalla de edición de perfil
  const handleEditProfile = () => {
    setIsMenuOpen(false);
    navigation.navigate('EditarPerfil');
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          {/* Barra superior */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={25} color="#000" />
            </TouchableOpacity>
            <View style={styles.icons}>
              <Icon name="bell" size={25} color="#000" style={styles.icon} />
              <TouchableOpacity onPress={handleMenuToggle}>
                <Icon name="ellipsis-h" size={25} color="#000" style={styles.icon} />
              </TouchableOpacity>
              {isMenuOpen && (
                <View style={styles.menu}>
                  <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
                    <Text style={styles.menuItemText}>Editar perfil</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                    <Text style={styles.menuItemText}>Cerrar sesión</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* Perfil */}
          <View style={styles.profileHeader}>
            <TouchableOpacity onPress={handleImagePick}>
              <Image
                source={profileImage ? { uri: profileImage } : require('../assets/img/perfil.png')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <Text style={styles.username}>@{user?.nickname || 'nickname'}</Text>
            <Text style={styles.level}>Nivel: Principiante</Text>
          </View>

          {/* Estadísticas */}
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Monedas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Encuestas hechas</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'likes' && styles.activeTab]}
              onPress={() => setActiveTab('likes')}
            >
              <Icon name="heart" size={20} color={activeTab === 'likes' ? '#FF4500' : '#000'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'surveys' && styles.activeTab]}
              onPress={() => setActiveTab('surveys')}
            >
              <Icon name="clipboard" size={20} color={activeTab === 'surveys' ? '#FF4500' : '#000'} />
            </TouchableOpacity>
          </View>

          {/* Contenido dinámico */}
          {activeTab === 'likes' ? (
            <FlatList
              data={likedImages}
              keyExtractor={(item) => item.id}
              numColumns={3}
              renderItem={({ item }) => <Image source={item.src} style={styles.gridImage} />}
            />
          ) : (
            <FlatList
              data={surveys}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.surveyItem}>
                  <Image source={item.image} style={styles.surveyImage} />
                  <View style={styles.surveyInfo}>
                    <Text style={styles.surveyTitle}>{item.title}</Text>
                    <Text style={styles.surveyDescription}>{item.description}</Text>
                    <TouchableOpacity style={styles.surveyButton}>
                      <Text style={styles.surveyButtonText}>Empezar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
        </>
      ) : (
        // Vista para usuarios no registrados
        <View style={styles.notLoggedInContainer}>
          <Text style={styles.notLoggedInText}>
            Debe registrarse para poder acceder a más funciones
          </Text>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('HomeRegister')}
          >
            <Icon name="user" size={20} color="white" />
            <Text style={styles.registerButtonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilos
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 40,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  menu: {
    position: 'absolute',
    top: 30,
    right: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    zIndex: 100,
  },
  menuItem: {
    paddingVertical: 5,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FF4500',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  level: {
    fontSize: 14,
    color: '#777',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#FF4500',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF4500',
  },
  gridImage: {
    width: '30%',
    aspectRatio: 1,
    margin: '1.66%',
  },
  surveyItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  surveyImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  surveyInfo: {
    flex: 1,
    marginLeft: 10,
  },
  surveyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  surveyDescription: {
    fontSize: 14,
    color: '#777',
  },
  surveyButton: {
    marginTop: 10,
    backgroundColor: '#FF4500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  surveyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notLoggedInText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  registerButton: {
    flexDirection: 'row',
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
