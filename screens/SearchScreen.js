import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { fetchVideos } from '../services/Search/SearchService';
const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Llamar a fetchVideos para obtener los datos simulados
    const fetchedVideos = fetchVideos();
    setVideos(fetchedVideos);
  }, []);
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
    height: 200,
    borderRadius: 8,
  },
  videoTitle: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SearchScreen;
