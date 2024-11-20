import React from 'react';
import { View, Button,Text, StyleSheet ,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/MonedasStyle';
const Monedas = ({ navigation }) => {
    
  return (

    <View style={styles.container}>

      
        <View style={styles.container_hijo}>
            <Text style={styles.Titulo}>Monedas</Text>
            <Text style={styles.Titulo2}>Tu Saldo de Monedas</Text>
            <View style={styles.Monedas_Padre}>
                <View style={styles.Moneda_}>
                    
                     <Icon style={styles.Moneda__} name="gg-circle" size={35} color="yellow" />
                    
                    
                </View>
                <View  style={styles.Moneda_}>
                    
                    <Text style={styles.Moneda_cant}>0</Text>
                    
                    
                </View>
            </View>
            <Text style={styles.Pregunta_mo}>
                ¿Como consigo monedas?
            </Text>
            <Text style={styles.texto_grande}>
            ¡Es muy fácil! Participa en nuestras encuestas sobre las películas que mejor conoces. ¿Te sientes seguro? ¡Ven y demuestra tus conocimientos!
            </Text>
            <View style={styles.boton_encuesta_padre}>
                <TouchableOpacity  style={styles.boton_encuesta} onPress={() => navigation.navigate('Pelicula')}>
                    <Text style={styles.boton_en}>
                        Participa ahora
                    </Text>
                </TouchableOpacity>
            </View>

        </View>


    </View>



  );
};



export default Monedas;