import React from 'react';
import { View, Button,Text, StyleSheet ,TouchableOpacity,Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/MonedasStyle';
const Monedas = ({ navigation ,route}) => {
  const { puntaje } = route.params;
  return (
    <View style={styles.container}>
      
      
        <View style={styles.container_hijo}>
            
            <Text style={styles.Titulo2}>No lo lograste esta vez</Text>
            <View style={styles.Monedas_Padre}>
            <Image
                      source={ require('../../assets/img/Sad.png')} // Imagen de perfil por defecto
                      style={styles.profileImage_modenad}
                    />
            </View>
            <Text style={styles.Titulo2}>¡No te preocupes!</Text>
            <Text style={styles.texto_grande}>
            Tal vez necesites volver a ver la película o se te escapó algún detalle. ¡Sigue jugando, cada intento te acerca más a la victoria!
            </Text>
            <View style={styles.boton_encuesta_padre}>
                <TouchableOpacity  style={styles.boton_encuesta} onPress={() => navigation.navigate('Encuesta')}>
                    <Text style={styles.boton_en}>
                    Volver a intentarlo                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};
export default Monedas;