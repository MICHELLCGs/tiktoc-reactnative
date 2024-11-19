import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Video } from 'expo-av';

import { View, FlatList, SafeAreaView, Text, Dimensions, 
  TouchableWithoutFeedback, TouchableOpacity, StyleSheet,
   Alert, TextInput, Modal, Button ,Animated,PanResponder} from 'react-native';

   import Icon from 'react-native-vector-icons/FontAwesome';
   import * as FileSystem from 'expo-file-system';
   import styles from './styles/HomeStyle';
   import MonedasModal from '../components/modal';
   import PlataformaModal from '../components/plataforma';
   const { height: viewportHeight } = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [videos, setVideos] = useState([
    {
      _id: '1',
      videoUrl: 'https://videos.pexels.com/video-files/8953675/8953675-uhd_1440_2560_30fps.mp4',
      user: 'Usuario 1',
      link: 'Link de la pelicula',
      Plataforma: 'Plataforma',
      sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2',
      comments: [],
      linkEnabled: false,
    },
    {
      _id: '2',
      videoUrl: 'https://videos.pexels.com/video-files/28792890/12478782_1080_1920_30fps.mp4',
      user: 'Usuario 3',
      link: 'Link de la pelicula',
      Plataforma: 'Plataforma',
      sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2',
      comments: [],  // Aseguramos que la propiedad comments exista
      linkEnabled: true,
    },
    {
      _id: '3',
      videoUrl: 'https://videos.pexels.com/video-files/16097756/16097756-hd_1080_1920_30fps.mp4',
      user: 'Usuario 4',
      link: 'Link de la pelicula',
      Plataforma: 'Plataforma',
      sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2',
      comments: [],  // Aseguramos que la propiedad comments exista
      linkEnabled: true,
    },
    {
      _id: '4',
      videoUrl: 'https://videos.pexels.com/video-files/11280923/11280923-hd_1080_1920_60fps.mp4',
      user: 'Usuario 5',
      link: 'Link de la pelicula',
      Plataforma: 'Plataforma',
      sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2',
      comments: [],  // Aseguramos que la propiedad comments exista
      linkEnabled: true,
    },
  ]);



  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentComment, setCurrentComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);  // Para mostrar el modal de comentarios
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);  // Para saber qué video tiene los comentarios
  const videoRefs = useRef([]);

  //Cache
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


//Like
  useEffect(() => {
    const videosWithLikes = videos.map(video => ({
      ...video,
      likes: video.likes || 0,
      liked: video.liked || false
    }));
    setVideos(videosWithLikes);
  }, []);



  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      setCurrentIndex(newIndex);
    }
  });

  const handleVideoPress = useCallback(async (index) => {
    const video = videoRefs.current[index];
    if (video) {
      const status = await video.getStatusAsync();
      if (status.isPlaying) {
        video.pauseAsync();
      } else {
        video.playAsync();
      }
    }
  }, []);

  const handleLike = useCallback((index) => {
    setVideos((prevVideos) => {
      const updatedVideos = [...prevVideos];
      const updatedVideo = { ...updatedVideos[index] };
      updatedVideo.liked = !updatedVideo.liked;
      updatedVideo.likes = updatedVideo.liked ? updatedVideo.likes + 1 : updatedVideo.likes - 1;
      updatedVideos[index] = updatedVideo;
      return updatedVideos;
    });
  }, []);


  const handleCommentPress = useCallback((index) => {
    setSelectedVideoIndex(index);
    setModalVisible(true);  // Mostrar el modal de comentarios
  }, []);

  const handleSubmitComment = useCallback(() => {
    if (currentComment.trim() === '') {
      Alert.alert('Error', 'Por favor, escribe un comentario válido.');
      return;
    }

    const newComment = {
      user: 'Usuario X',  // Aquí puedes agregar el nombre de usuario actual
      text: currentComment
    };

    setVideos((prevVideos) => {
      const updatedVideos = [...prevVideos];
      const updatedVideo = { ...updatedVideos[selectedVideoIndex] };
      updatedVideo.comments = [...updatedVideo.comments, newComment];
      updatedVideos[selectedVideoIndex] = updatedVideo;
      return updatedVideos;
    });

    setCurrentComment('');
    
  }, [currentComment, selectedVideoIndex]);

 //ModalMoneda
 const [modalplataformaVisible, setModalplataformaVisible] = useState(false);
 //ModalMoneda
 const openModalPlataforma = () => {
  setModalplataformaVisible(true);
};
const closeModalPlataforma = () => {
  setModalplataformaVisible(false);
};

   //ModalMoneda
   const [modalmonedaVisible, setModalmonedaVisible] = useState(false);
   //ModalMoneda
   const openModalMoneda = () => {
    setModalmonedaVisible(true);
  };
  const closeModalMoneda = () => {
    setModalmonedaVisible(false);
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
      <View >
        <TouchableOpacity
          onPress={openModalPlataforma}
          style={{ display: 'flex', flexDirection: 'row', marginTop: 15, gap: 10, left: 30 }}
        >
          <Icon name="link" size={26} color="red" />
          <Text style={styles.subtitu}>{item.Plataforma}</Text>
        </TouchableOpacity>
        <PlataformaModal visible={modalplataformaVisible} onClose={closeModalPlataforma} />
      </View>

      {item.linkEnabled ? (
        // Botón para usuarios con permisos
        <View>
          <TouchableOpacity
            //onPress={() => navigation.navigate('Monedas')}
            style={{ display: 'flex', flexDirection: 'row', marginTop: 15, gap: 10, left: 30 }}
          >
            <Icon name="link" size={26} color="white" />
            <Text style={styles.subtitu}>{item.link}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Botón para usuarios sin permisos
        <View >
          <TouchableOpacity
            onPress={openModalMoneda}
            style={styles.nopermitido}
          >
            <Icon name="info-circle" size={26} color="white" />
            <Text style={styles.subtitu__}>Desbloquear Link</Text>
          </TouchableOpacity>
          <MonedasModal visible={modalmonedaVisible} onClose={closeModalMoneda} />

        </View>
      )}

    </View>

    {/* Botón de Like posicionado en la parte derecha superior */}
    <View style={styles.rightContainer}>
      <TouchableOpacity onPress={() => handleLike(index)} style={styles.likeButton}>
        <Icon name={item.liked ? 'heart' : 'heart-o'} size={30} color={item.liked ? 'red' : 'white'} />
        <Text style={styles.likeText}>{item.likes}</Text>
      </TouchableOpacity>
      {/* Botón de comentarios */}


      <TouchableOpacity onPress={() => handleCommentPress(index)} style={styles.commentButton}>
        <Icon name="comment-o" size={30} color="white" />
      </TouchableOpacity>
    </View>
  </View>
);

  //

  const dragY = useRef(new Animated.Value(0)).current; // Utilizamos useRef en lugar de useState

  const panResponder = useRef(
      PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: Animated.event(
              [null, { dy: dragY }],
              { useNativeDriver: false }
          ),
          onPanResponderRelease: (e, gestureState) => {
              if (gestureState.dy > 150) {
                setModalVisible(false); // Cerrar el modal si se desliza hacia abajo más de 20 unidades
              } else {
                  Animated.spring(dragY, {
                      toValue: 0, // Volver a la posición inicial si el deslizamiento no es suficiente
                      useNativeDriver: false,
                      speed: 2,
                  }).start();
              }
          },
      })
  ).current;

  // Restablecer el valor de dragY al abrir el modal
  React.useEffect(() => {
    if (modalVisible) {
        dragY.setValue(0);
    }
}, [modalVisible]);


  return (
    <View style={styles.container}>
      {/* Agregado al inicio */}
      <View style={styles.cabe}>
        <View style={styles.cabetop}>

          <TouchableOpacity style={styles.moneda} onPress={() => navigation.navigate('Monedas')}>
              <View>
                <Icon name="gg-circle" size={25} color="yellow" />
              </View>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: '500' }}>0</Text>
            </TouchableOpacity>

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

      {/* Modal para comentarios estilo TikTok */}
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback style={{backgroundColor:'red'}} onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
          <Animated.View
                    style={[
                        styles.modalContent,
                        {
                            transform: [
                                { translateY: dragY }
                            ]
                        }
                    ]}
                    {...panResponder.panHandlers}
                >
            <TouchableWithoutFeedback>
            
              <View style={styles.modalContent}>
              <View style={styles.dragIndicator}>
                <View style={styles.dragIndicator2}>
                  
                </View>
              </View>
              <View style={styles.modaltitle_padre}>
                  <Text style={styles.modalTitle}>Comentarios</Text>
              </View>
                <View style={styles.coment}>
                      {/* Lista de comentarios */}
                  <FlatList style={styles.comentarios_}
                    data={videos[selectedVideoIndex]?.comments || []}
                    renderItem={({ item, index }) => (
                      <View key={index} style={styles.commentItem}>
                        <Text style={styles.commentUser}>{item.user}</Text>
                        <Text style={styles.commentText}>{item.text}</Text>
                      </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
                
                <View style={styles.input_padre}>
                  <View style={styles.input_padre_hijo1}>
                    <TextInput
                      style={styles.commentInput}
                      placeholder="Escribe un comentario..."
                      placeholderTextColor="gray"
                      value={currentComment}
                      onChangeText={setCurrentComment}
                    />
                  </View>
                  <View style={styles.input_padre_hijo2}>
                    <TouchableOpacity style={styles.sendButton} onPress={handleSubmitComment}>
          
                    <Icon style={styles.sendButtonText} name="paper-plane" size={25} color="yellow" />
                  </TouchableOpacity>
                  </View>
                  
                </View>
                
              </View>
            </TouchableWithoutFeedback>
            </Animated.View>     
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};


export default HomeScreen;