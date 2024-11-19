import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet ,TouchableOpacity,ScrollView, Image, Alert} from 'react-native';
import { useAuth } from '../authentication/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/ProfileStyle';


//nuevo
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
//
const ProfileScreen = ({ navigation }) => {

  const { isLoggedIn, user, logout } = useAuth();
  const [activeView, setActiveView] = useState('likedVideos');
  //nuevo
  const [profileImage, setProfileImage] = useState(null); // Estado para la imagen de perfil
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para mostrar el menú de opciones
  const [userData, setUserData] = useState(null); // Para almacenar los datos del usuario
  // Cargar los datos del usuario desde AsyncStorage
  useEffect(() => {
    // Si no está logueado, redirigir al login
    if (!isLoggedIn) {
      navigation.navigate('Login'); // Cambia 'Login' por el nombre exacto de tu pantalla de login
    } else {
      // Si está logueado, cargar los datos del usuario desde AsyncStorage
      const loadUserData = async () => {
        try {
          const storedUser = await AsyncStorage.getItem('currentUser');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserData(parsedUser);
            console.log('Datos recuperados del AsyncStorage:', parsedUser);
          }
        } catch (error) {
          console.error('Error al recuperar los datos del usuario:', error);
        }
      };
      loadUserData();
    }
  }, [isLoggedIn]); // Dependemos de isLoggedIn para redirigir correctamente cuando cambia


  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.assets) {
        setProfileImage(response.assets[0].uri); // Establece la URI de la imagen seleccionada
      }
    });
  };
  
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna la visibilidad del menú de opciones
  };

  const handleLogout = () => {
    logout(); // No necesitamos navegar a ninguna pantalla específica
  };

  const handleEditProfile = () => {
    navigation.navigate('Editar Perfil'); // Navega a la pantalla EditProfile
  };

  //{backgroundColor:'transparent',flex: 1,alignItems: 'center',justifyContent:'center'}


  //likevideos
  const Imagenes = [
    {
      id:1,
      imagen: require('../assets/img/imageperfil.png'),
    },
    {
      id:2,
      imagen: require('../assets/img/imageperfil.png'),
    },
    {
      id:3,
      imagen: require('../assets/img/imageperfil.png'),
    },
    {
      id:4,
      imagen: require('../assets/img/imageperfil.png'),
    },
    {
      id:5,
      imagen: require('../assets/img/imageperfil.png'),
    },
    {
      id:6,
      imagen: require('../assets/img/imageperfil.png'),
    },
    {
      id:7,
      imagen: require('../assets/img/imageperfil.png'),
    },
    {
      id:8,
      imagen: require('../assets/img/imageperfil.png'),
    },
    {
      id:9,
      imagen: require('../assets/img/imageperfil.png'),
    },
    {
      id:10,
      imagen: require('../assets/img/imageperfil.png'),
    },
  ];

   //likevideos
   const encuestas = [
    {
      id:1,
      pelicula:'Pelicula #1',
      imagen: require('../assets/img/imageperfil.png'),
      texto:'qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit'
    },
    {
      id:2,
      pelicula:'Pelicula #2',
      imagen: require('../assets/img/imageperfil.png'),
      texto:'qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit'
    },
    {
      id:3,
      pelicula:'Pelicula #3',
      imagen: require('../assets/img/imageperfil.png'),
      texto:'qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit'
    },
    {
      id:4,
      pelicula:'Pelicula #4',
      imagen: require('../assets/img/imageperfil.png'),
      texto:'qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit'
    },
    {
      id:5,
      pelicula:'Pelicula #5',
      imagen: require('../assets/img/imageperfil.png'),
      texto:'qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit'
    },
    {
      id:6,
      pelicula:'Pelicula #6',
      imagen: require('../assets/img/imageperfil.png'),
      texto:'qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit'
    },
    {
      id:7,
      pelicula:'Pelicula #7',
      imagen: require('../assets/img/imageperfil.png'),
      texto:'qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit'
    },
    {
      id:8,
      pelicula:'Pelicula #8',
      imagen: require('../assets/img/imageperfil.png'),
      texto:'qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit'
    },
    {
      id:9,
      pelicula:'Pelicula #9',
      imagen: require('../assets/img/imageperfil.png'),
      texto:'qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit'
    },
    {
      id:10,
      pelicula:'Pelicula 10',
      imagen: require('../assets/img/imageperfil.png'),
      texto:'qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit'
    },
  ];
  const renderButtons = () => {
    
    return Imagenes.map((item) => (
      <TouchableOpacity key={item.id} style={styles.button}>
        <Image source={item.imagen} style={styles.image} />
        
      </TouchableOpacity>
    ));
  };

  const renderButtons2 = () => {
    
    return encuestas.map((item) => (
      <View key={item.id} style={styles.contenedor_general_enc}>
          <View style={styles.content_int_}>

            {/* Título de la película */}
            <Text style={styles.title_peliculas}>{item.pelicula}</Text>
            
            {/* Imagen de la película */}
            <Image source={item.imagen} style={styles.image_segundo_b} />
                        
          </View>
          
          <View style={styles.content_int_}>
                {/* Descripción del texto */}
              <Text style={styles.text_inf_p}>{item.texto}</Text>
              
              {/* Botón */}
              <TouchableOpacity onPress={() => navigation.navigate('Encuesta')} style={styles.btn_mas}>
                <Text style={styles.btnText_con}>Empezar</Text>
              </TouchableOpacity>
          </View>
          
        </View>
    ));

  };

  return (
    <View style={styles.container}>
      <View style={styles.container_int}>
    
    
          
            {/* Barra superior con los iconos */}
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="bell-o" size={25} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MovieUnlock')}>
              <Icon name="trophy" size={25} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMenuToggle}>
              <Icon name="ellipsis-h" size={30} color="black" />
            </TouchableOpacity>
          

          </View>

            {/* Imagen de perfil - Sin TouchableOpacity para evitar interacción */}
            <View style={styles.Perfilimage}>

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

              <View style={styles.perfilimage_int} >

                <View style={styles.perfilimage_int_perfil}>
                  <Image
                    source={require('../assets/img/fotoperfil.png')} // Imagen de perfil por defecto
                    style={styles.profileImage}
                  />
                  
                  <View style={styles.confperfil} >
                      <TouchableOpacity onPress={handleLogout}>
                      <Image
                        source={profileImage ? { uri: profileImage } : require('../assets/img/Pen.png')} // Imagen de perfil por defecto
                        style={styles.pen}
                    />
                    </TouchableOpacity>
                  </View>
                  
                </View>

                <View style={styles.perfilimage_int_datos}>

                    <View style={styles.perfilimage_int_usuario}>
                        {/* Nombre de usuario */}
                        <Text style={styles.userName}>
                          {userData ? userData.username : 'Cargando...'}
                        </Text>
                    </View>

                    <View style={styles.perfilimage_int_nivel}>
                        <View style={styles.perfilimage_int_nivel_int}>
                          <View style={styles.perfilimage_int_levelt}>
                            <Image
                                source={profileImage ? { uri: profileImage } : require('../assets/cinemapopcorn.png')} // Imagen de perfil por defecto
                                style={styles.profileImage2}
                              />
                          </View>
                          <View style={styles.perfilimage_int_levelt}>
                              <Text style={styles.perfilimage_int_levelt_texto}>1</Text>
                          </View>
                            
                        </View>
                        <View>
                          <Text style={styles.textoprin}>Nivel: Principiante</Text>
                        </View>
                    </View>

                </View>
              </View>
              
            </View>
          
          
          {/* Información adicional */}
          
  
          <View style={styles.statsContainer}>

            <View style={styles.stat}>
              <View style={styles.stat_int}>
                <View style={styles.stat_int_bot}>
                    <Image
                      source={profileImage ? { uri: profileImage } : require('../assets/Coins.png')} // Imagen de perfil por defecto
                      style={styles.profileImage_modenad}
                    />
                </View>
                <View style={styles.stat_int_bot}>
                    <Text style={styles.stat_int_bot_letra}>0</Text>
                </View>
              </View>

               <Text style={styles.stat_int_bot_letra_letra}> Monedas</Text> 
            </View>
            


            <View style={styles.stat}>
              <View style={styles.stat_int}>
                  <View style={styles.stat_int_bot}>
                      <Image
                        source={profileImage ? { uri: profileImage } : require('../assets/img/ExamPaper.png')} // Imagen de perfil por defecto
                        style={styles.profileImage_modenad2}
                      />
                  </View>
                  <View style={styles.stat_int_bot}>
                      <Text style={styles.stat_int_bot_letra}>0</Text>
                  </View>
                </View>

               <Text style={styles.stat_int_bot_letra_letra}>Encuestas hechas</Text>
            </View>

          </View>

         

          {/* Interacciones (Me gusta y Encuestas completadas) */}
           {/* Botones para seleccionar la vista */}
      <View style={styles.interactionsContainer}>
          <TouchableOpacity
            style={[
              styles.iconButton,
              activeView === 'likedVideos' && styles.activeButton,
            ]}
            onPress={() => setActiveView('likedVideos')}
          >
            <Icon name="heart" size={30} color="#FF4500" />
          
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.iconButton,
              activeView === 'completedSurveys' && styles.activeButton,
            ]}
            onPress={() => setActiveView('completedSurveys')}
          >
            <Icon name="clipboard" size={30} color="black" />
    
          </TouchableOpacity>
      </View>

      {/* Vistas dinámicas */}
      <View style={styles.contentContainer}>
        {activeView === 'likedVideos' && (
          <View style={styles.videosLike}>
            <ScrollView>
                <View style={styles.buttonContainer}>{renderButtons()}</View>
            </ScrollView>
          </View>
        )}
        {activeView === 'completedSurveys' && (
          <View style={styles.videosLike}>
          <ScrollView>
              <View style={styles.buttonContainer}>{renderButtons2()}</View>
          </ScrollView>
        </View>
        )}
      </View>




    </View>
    </View>
  );
};


export default ProfileScreen;
