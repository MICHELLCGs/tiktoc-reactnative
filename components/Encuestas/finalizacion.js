import React from 'react';
import { View, Button,Text, StyleSheet ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/MonedasStyle';
const Monedas = ({ navigation }) => {
  return (

    <View style={styles.container}>

      
        <View style={styles.container_hijo}>
            
            <Text style={styles.Titulo2}>¡Terminaste con exito la encuesta!</Text>
            <View style={styles.Monedas_Padre}>
                <View style={styles.Moneda_}>
                    
                     <Icon style={styles.Moneda__} name="gg-circle" size={35} color="yellow" />
                    
                    
                </View>
                <View  style={styles.Moneda_}>
                    
                    <Text style={styles.Moneda_cant}>10</Text>
                    
                    
                </View>
            </View>
          
            <Text style={styles.texto_grande}>
            ¡Recuerda que mientras mas monedas mas oportunidades tendras para desbloquear nuevas peliculas para difrutar!
            </Text>
            <View style={styles.boton_encuesta_padre}>
                <TouchableOpacity  style={styles.boton_encuesta} onPress={() => navigation.navigate('Encuesta')}>
                    <Text style={styles.boton_en}>
                    Volver a inicio
                    </Text>
                </TouchableOpacity>
            </View>

        </View>


    </View>



  );
};



export default Monedas;