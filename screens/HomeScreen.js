import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Video } from 'expo-av';
import { View, FlatList, SafeAreaView, Text, Dimensions, TouchableWithoutFeedback, TouchableOpacity, StyleSheet, Alert, TextInput, Modal, Button } from 'react-native';
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
      sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2',
      comments: []  // Aseguramos que la propiedad comments exista
    },
    {
      _id: '2',
      videoUrl: 'https://videos.pexels.com/video-files/28792890/12478782_1080_1920_30fps.mp4',
      user: 'Usuario 3',
      link: 'Link de la pelicula',
      Plataforma: 'Plataforma',
      sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2',
      comments: []  // Aseguramos que la propiedad comments exista
    },
    {
      _id: '3',
      videoUrl: 'https://videos.pexels.com/video-files/16097756/16097756-hd_1080_1920_30fps.mp4',
      user: 'Usuario 4',
      link: 'Link de la pelicula',
      Plataforma: 'Plataforma',
      sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2',
      comments: []  // Aseguramos que la propiedad comments exista
    },
    {
      _id: '4',
      videoUrl: 'https://videos.pexels.com/video-files/11280923/11280923-hd_1080_1920_60fps.mp4',
      user: 'Usuario 5',
      link: 'Link de la pelicula',
      Plataforma: 'Plataforma',
      sinopsis: 'Sinopsis corta de la pelicula #pelicula_1 #pelicula_2',
      comments: []  // Aseguramos que la propiedad comments exista
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentComment, setCurrentComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);  // Para mostrar el modal de comentarios
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);  // Para saber qué video tiene los comentarios
  const videoRefs = useRef([]);

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
    setModalVisible(false);  // Cerrar el modal después de enviar el comentario
  }, [currentComment, selectedVideoIndex]);

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

  return (
    <View style={styles.container}>
      {/* Agregado al inicio */}
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

      {/* Modal para comentarios estilo TikTok */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Comentarios</Text>
                {/* Lista de comentarios */}
                <FlatList
                  data={videos[selectedVideoIndex]?.comments || []}
                  renderItem={({ item, index }) => (
                    <View key={index} style={styles.commentItem}>
                      <Text style={styles.commentUser}>{item.user}:</Text>
                      <Text style={styles.commentText}>{item.text}</Text>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
                <TextInput
                  style={styles.commentInput}
                  placeholder="Escribe un comentario..."
                  placeholderTextColor="gray"
                  value={currentComment}
                  onChangeText={setCurrentComment}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSubmitComment}>
                  <Text style={styles.sendButtonText}>Enviar Comentario</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  },

  rightContainer: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -50 }],
    justifyContent: 'space-between',
    height: 200,
  },
  likeButton: {
    alignItems: 'center',
  },
  likeText: {
    color: 'white',
    marginTop: 5,
  },
  commentButton: {
    alignItems: 'center',
    position: 'absolute', // Mantener el botón de comentarios posicionado de forma absoluta
    top: 70, // Ajustamos para que quede justo abajo del like
  },
  commentText: {
    color: 'white',
    marginTop: 5,
  },

  /* Estilos para el Modal */
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Para que el modal aparezca en la parte inferior
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fondo claro con opacidad
  },
  modalContent: {
    backgroundColor: '#fff', // Fondo blanco para modo claro
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '50%',
  },
  modalTitle: {
    color: '#000', // Texto oscuro para modo claro
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  commentUser: {
    color: '#000', // Texto del usuario en color oscuro
    fontWeight: 'bold',
  },
  commentText: {
    color: '#333', // Texto de comentario en gris oscuro
  },
  commentInput: {
    backgroundColor: '#f0f0f0', // Fondo claro para el input
    color: '#000', // Texto oscuro en el input
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    height: 50,
  },
  sendButton: {
    backgroundColor: '#FF4500', // Color característico de TikTok
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff', // Texto blanco en el botón de envío
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;