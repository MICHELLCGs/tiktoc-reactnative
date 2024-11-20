import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/MovieUnlockStyle';
import PlataformaModal from '../../components/plataforma';

const Monedas = ({ navigation }) => {
  // Modal
  const [modalplataformaVisible, setModalplataformaVisible] = useState(false);

  const openModalPlataforma = () => {
    setModalplataformaVisible(true);
  };

  const closeModalPlataforma = () => {
    setModalplataformaVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_hijo}>
        {/* Imagen de Película */}
        <Image
          source={require('../../assets/Frame.png')}
          style={styles.image} // Estilos de la imagen
        />

        {/* Detalles de la Película */}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>Pelicula #1</Text>
          <Text style={styles.description}>Descripción ...</Text>
        </View>

        {/* Botón */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={openModalPlataforma}
            style={styles.button}
          >
            <Icon name="link" size={18} color="#fff" />
            <Text style={styles.buttonText}>Ver</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <PlataformaModal visible={modalplataformaVisible} onClose={closeModalPlataforma} />
    </View>
  );
};

export default Monedas;
