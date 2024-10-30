import React, { useEffect, useState, useRef } from 'react';
import { Video } from 'expo-av';
import { View, FlatList, SafeAreaView, Text, Dimensions, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system';

const { height: viewportHeight } = Dimensions.get('window');

const HomeScreen = () => {
  const [videos, setVideos] = useState([
    {
      _id: '1',
      videoUrl: 'https://videos.pexels.com/video-files/8953675/8953675-uhd_1440_2560_30fps.mp4',
      user: 'Usuario 1',
      link: 'Link de la pelicula',
      Plataforma: 'Plataforma',
      sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2'
    },
    
    {
      _id: '2',
      videoUrl: 'https://videos.pexels.com/video-files/28792890/12478782_1080_1920_30fps.mp4',
      user: 'Usuario 3',
      link: 'Link de la pelicula',
      Plataforma: 'Plataforma',
      sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2'
    },
    {
      _id: '3',
      videoUrl: 'https://videos.pexels.com/video-files/16097756/16097756-hd_1080_1920_30fps.mp4',
      user: 'Usuario 4',
      link: 'Link de la pelicula',
      Plataforma: 'Plataforma',
      sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2'
    },
    {
      _id: '4',
      videoUrl: 'https://videos.pexels.com/video-files/11280923/11280923-hd_1080_1920_60fps.mp4',
      user: 'Usuario 5',
      link: 'Link de la pelicula',
      Plataforma: 'Plataforma',
      sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2'
    },
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  const cacheVideo = async (videoUrl) => {
    try {
      // Convierte la URL del video en una ruta de archivo única
      // Usar solo el nombre del archivo para evitar problemas con la ruta
      const fileName = videoUrl.split('/').pop(); // Obtiene solo el nombre del archivo
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`; // Construye la ruta del archivo
  
      // Verifica si el archivo ya existe en caché
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        console.log(`Video no está en caché, descargando: ${videoUrl}`);
        await FileSystem.downloadAsync(videoUrl, fileUri);
        console.log(`Video almacenado en caché: ${fileUri}`);
      } else {
        console.log(`Video ya está en caché: ${fileUri}`);
      }
    } catch (error) {
      console.error(`Error al almacenar en caché el video ${videoUrl}:`, error);
      Alert.alert('Error', `No se pudo almacenar en caché el video: ${error.message}`);
    }
  };

  useEffect(() => {
    // Almacenar en caché todos los videos al cargar el componente
    videos.forEach((video) => {
      cacheVideo(video.videoUrl);
    });
  }, [videos]);

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  });

  const handleVideoPress = async (index) => {
    const video = videoRefs.current[index];
    if (video) {
      const status = await video.getStatusAsync();
      if (status.isPlaying) {
        video.pauseAsync();
      } else {
        video.playAsync();
      }
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.videoContainer}>
      <TouchableWithoutFeedback onPress={() => handleVideoPress(index)}>
        <View style={styles.videoWrapper}>
          <Video
            ref={(ref) => { videoRefs.current[index] = ref; }}
            source={{ uri: item.videoUrl }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay={currentIndex === index}
            isLooping
            useNativeControls={false}
          />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.informacion}>
        <Text style={styles.titulo}>{item.user}</Text>
        <Text style={styles.titulo}>{item.sinopsis}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15, gap: 10, left: 30 }}>
          <Icon name="link" size={26} color="white" />
          <Text style={styles.subtitu}>{item.Plataforma}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', marginTop: 15, gap: 10, left: 30 }}>
          <Icon name="link" size={26} color="white" />
          <Text style={styles.subtitu}>{item.link}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cabe}>
        <View style={styles.cabetop}>
          <View style={styles.moneda}>
            <View>
              <Icon name="gg-circle" size={25} color="yellow" />
            </View>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: '500' }}>0</Text>
          </View>
          <View style={styles.buscar_top}>
            <Icon name="search" size={25} color="white" style={{ padding: 6 }} />
          </View>
        </View>
      </View>

      <FlatList
        data={videos}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={viewportHeight}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        onViewableItemsChanged={handleViewableItemsChanged.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  moneda:{
    backgroundColor:'#9c9d9fc0',
    borderRadius:10,
    width:'22%',
    display:'flex',
    gap:24,
    flexDirection:'row',
    left:20,
    margin:10,
    padding:5,
  },
  buscar_top:{
    backgroundColor:'transparent',
    margin:5,
    width:'13%',
    
    position:'absolute',
    right:0
  },
  cabe:{
    backgroundColor:'transparent',
    width:'100%',
    paddingTop: 30,
    position:'absolute',
    zIndex:999
  },
  cabetop:{
    display:'flex',
    flexDirection:'row',
    backgroundColor:'transparent',
    height:55,
    width:'100%',
    zIndex:999
    
  },
  carouselContainer: {
      
    backgroundColor:'transparent'
  },
  videoContainer: {
    height: viewportHeight,
    
    backgroundColor: 'blue',
    
  },
  videoWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor:'black',
    
  },
  video: {
      width: '100%',
      height:'100%',
      
    
  },
  informacion:{
    backgroundColor:'transparent',
    position:'absolute',
    bottom:55,
    marginLeft:2,
    
  },
  informa_inter:{
    marginLeft:10,
    backgroundColor:'transparent',
    position:'relative'
  },
  iconWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 50,
    width: 70,
    height: 70,
  },
  titulo:{
    backgroundColor:'transparent',
    fontWeight:'bold',
    fontSize:16,
    color:'white',
    left:15,
    width:'90%'
  },
  subtitu:{
    color:'white',
    backgroundColor:'transparent',
    width:'80%',
    fontSize:15,
    textShadowColor: 'black',
    textShadowRadius: 0,
    
    
  },
  informacion_usuario:{
      backgroundColor:'red',
      width:'100%',
      position:'absolute',
      
  },

  subida_video:{
    backgroundColor:'white',
    height:700,
    justifyContent:'center',
    alignItems:'center'
  },

  interno_subida:{
    backgroundColor:'transparent',
    width:'80%'
  },
  texf:{
    backgroundColor:'gray',
    color:'white',
    padding:10,
    borderRadius:18,
    
    borderColor:'black'
  },

  botones1:{
    marginTop:10,
    borderRadius:20,
    
    
  },
  titulo2:{
    fontWeight:'bold',
    fontSize:16,
    color:'black'
  },

  titulo3:{
    textAlign:'center',
    fontSize:20,
    padding:10
  },



  //login
  navigation:{
    backgroundColor:'orange'
  }

,
});

export default HomeScreen;
