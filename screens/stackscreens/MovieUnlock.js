
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Button,Text, StyleSheet ,TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/MovieUnlockStyle';
import PlataformaModal from '../../components/plataforma';
const Monedas = ({ navigation }) => {
     //ModalMoneda
 const [modalplataformaVisible, setModalplataformaVisible] = useState(false);
 //ModalMoneda
 const openModalPlataforma = () => {
  setModalplataformaVisible(true);
};
const closeModalPlataforma = () => {
  setModalplataformaVisible(false);
};

  return (

    <View style={styles.container}>

      
        <View style={styles.container_hijo}>
            <View>
                <Image
                        source={require('../../assets/Frame.png')}

                        style={styles.image} // Estilos de la imagen
                />
            </View>

          <View>

          </View>
            <View>
                <Image
                        source={require('../../assets/img/imageperfil.png')}

                        style={styles.image} // Estilos de la imagen
                />
            </View>
            <View style={styles.boton_encuesta_padre}>
                <View>
                    <Text> Pelicula #1</Text>
                    <Text> Descripción ...</Text>
                </View>
                
                <View >
                    <TouchableOpacity
                    onPress={openModalPlataforma}
                    style={{ display: 'flex', flexDirection: 'row', marginTop: 15, gap: 10, left: 30 }}
                    >
                    <Icon name="link" size={26} color="red" />
                    <Text style={styles.subtitu}>boton</Text>
                    </TouchableOpacity>
                    <PlataformaModal visible={modalplataformaVisible} onClose={closeModalPlataforma} />
                </View>
            </View>

        </View>


    </View>



  );
};



export default Monedas;