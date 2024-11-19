
import { View, Text, Modal,Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './styles/PlataformaStyle';
const ModalExample = ({ visible, onClose}) => {
    const navigation = useNavigation();

  

   
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
         <View style={styles.container}>
         
      
            <View style={styles.container_hijo}>
                <View style={styles.container_hijo_retro}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    {/* Imagen */}
                    <Image
                        source={require('../assets/arrowt04.png')}

                        style={styles.image} // Estilos de la imagen
                    />
                    
                    </TouchableOpacity>
                </View>
                <Text style={styles.Titulo}>¿Donde la puedo ver?</Text>
                <View style={styles.textinf}>

                    <View style={styles.textoen}>
                        <Text style={styles.textotext}>
                        ¡Relájate y disfruta de tus películas favoritas en las mejores plataformas!
                        </Text>
                    </View>

                    <View style={styles.textimage}>
                    <Image
                        source={require('../assets/image34.png')}

                        style={styles.image__} // Estilos de la imagen
                    />
                    </View>
                </View>
                
                <View style={styles.plataformasss}>

                    <View>
                        <Image
                        source={require('../assets/netflix.png')}

                        style={styles.imageplatado} // Estilos de la imagen
                    />
                        <Text style={styles.tituplat}>
                        Neflix
                        </Text>
                    </View>

                    <View>
                    <Image
                        source={require('../assets/disney.png')}

                        style={styles.imageplatado} // Estilos de la imagen
                    />
                        <Text style={styles.tituplat}>
                         Disney +
                        </Text>
                    </View>

                    <View>
                        <Image
                            source={require('../assets/Hbo.png')}

                            style={styles.imageplatado} // Estilos de la imagen
                        />
                        <Text style={styles.tituplat}>
                            HBO max
                        </Text>
                    </View>

                </View>
             
               

            </View>


        </View>
      

        
      
    </Modal>
    );
};


export default ModalExample;
