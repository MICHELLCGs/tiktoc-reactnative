import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles/MonedasStyle';

const MovieScreen = () => {
  const navigation = useNavigation(); // Hook para navegación

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Películas desbloqueadas</Text>

      {/* Image */}
      <Image
        source={{ uri: 'https://via.placeholder.com/350x150' }} // Reemplaza con tu imagen
        style={styles.image}
      />

      {/* Tags */}
      <View style={styles.tagsContainer}>
        <Text style={styles.tag}>Año</Text>
        <Text style={styles.tag}>Etiqueta 1</Text>
        <Text style={styles.tag}>Etiqueta 2</Text>
        <Text style={styles.tag}>Etiqueta 3</Text>
      </View>

      {/* Movie Title */}
      <Text style={styles.movieTitle}>Película 1</Text>

      {/* Description */}
      <Text style={styles.description}>
        qui dolorem ipsum, quia dolor sit amet consectetur adipisci velit, sed
        quia non numquam eius modi tempora incidunt, ut labore et dolore magnam
        aliquam quaerat voluptatem
      </Text>

      {/* Button */}
      <TouchableOpacity
        style={styles.boton_encuesta}
        onPress={() => navigation.navigate('Encuesta')} // Navega a la pantalla 'Encuesta'
      >
        <Text style={styles.boton_en}>Preparado</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieScreen;
