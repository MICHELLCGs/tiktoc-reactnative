import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [videos, setVideos] = useState([
    { id: '1', title: 'Video 1', thumbnail: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Video 2', thumbnail: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Video 3', thumbnail: 'https://via.placeholder.com/150' },
    { id: '4', title: 'Video 4', thumbnail: 'https://via.placeholder.com/150' },
    { id: '5', title: 'Video 5', thumbnail: 'https://via.placeholder.com/150' },
    { id: '6', title: 'Video 6', thumbnail: 'https://via.placeholder.com/150' },
    { id: '7', title: 'Video 1', thumbnail: 'https://via.placeholder.com/150' },
    { id: '8', title: 'Video 2', thumbnail: 'https://via.placeholder.com/150' },
    { id: '9', title: 'Video 3', thumbnail: 'https://via.placeholder.com/150' },
    { id: '10', title: 'Video 4', thumbnail: 'https://via.placeholder.com/150' },
    { id: '11', title: 'Video 5', thumbnail: 'https://via.placeholder.com/150' },
    { id: '12', title: 'Video 6', thumbnail: 'https://via.placeholder.com/150' },
    { id: '13', title: 'Video 1', thumbnail: 'https://via.placeholder.com/150' },
    { id: '14', title: 'Video 2', thumbnail: 'https://via.placeholder.com/150' },
    { id: '15', title: 'Video 3', thumbnail: 'https://via.placeholder.com/150' },
    { id: '16', title: 'Video 4', thumbnail: 'https://via.placeholder.com/150' },
    { id: '17', title: 'Video 5', thumbnail: 'https://via.placeholder.com/150' },
    { id: '18', title: 'Video 6', thumbnail: 'https://via.placeholder.com/150' },
    // Agrega más videos si es necesario
  ]);

  // Filtrar videos según el texto de búsqueda
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.videoContainer}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.videoTitle}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Barra de búsqueda */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar videos..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      {/* Lista de videos */}
      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2} // Para mostrar dos videos por fila
        contentContainerStyle={styles.videoList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top:60,
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    paddingHorizontal: 10,
  },
  videoList: {
    paddingHorizontal: 10,
  },
  videoContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  thumbnail: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  videoTitle: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SearchScreen;
