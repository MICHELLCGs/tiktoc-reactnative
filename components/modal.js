
import { View, Text, Modal,Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
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
                <Text style={styles.Titulo}>Desbloquea el Link para ver esta pelicula</Text>
                <Text style={styles.Titulo2}>Necesitas 300 monedas para desbloquear este contenido</Text>
                <Text style={styles.Titulo2}>Tu saldo es de:</Text>
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
                    <TouchableOpacity  style={styles.boton_encuesta_desbloquear}>
                        <Text style={[styles.boton_en,{color:'black'}]}>
                            Desbloquear
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.boton_encuesta}
                        onPress={() => {
                            onClose(); // Cierra el modal
                            navigation.navigate('Encuesta'); // Navega a la página 'Encuesta'
                        }}
                        >
                        <Text style={styles.boton_en}>
                            Participa ahora
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>


        </View>
      

        
      
    </Modal>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#d1cdcd88',
        display:'flex',
        
        alignItems:'center'
    },
    container_hijo:{
        top:25,
        backgroundColor:'white',
        borderRadius:15,
        width:'80%',
        height:'83%',
        display:'flex',
        alignItems:'center',
    },
    container_hijo_retro:{
        backgroundColor:'transparent',
        width:'85%',
        height:'12%',
        justifyContent:'center'

    },
    image:{
        backgroundColor:'transparent',
        padding:15,
        
        
    },
    Titulo:{
        backgroundColor:'transparent',
        width:'70%',
        textAlign:'center',
        padding:15,
        fontWeight:'600',
        fontSize:16
    },
    Titulo2:{
        backgroundColor:'transparent',
        width:'100%',
        textAlign:'center',
        padding:20,
        fontWeight:'500',
        fontSize:16
    } ,
    Monedas_Padre:{
        backgroundColor:'transparent',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        height:'12%'
    } ,
    Moneda_:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        backgroundColor:'transparent',
        
        width:'15%',
        
        
    },
    Moneda__:{

        
    },
    Moneda_cant:{
        backgroundColor:'transparent',
        textAlign:'center',
        fontSize:40,
        fontWeight:'600', 
        padding:12
    },
    Pregunta_mo:{
        backgroundColor:'transparent',
        padding:18,
        textAlign:'center',
        fontSize:16,
        fontWeight:'500',
    },
    texto_grande:{
        backgroundColor:'transparent',
        textAlign:'center',
        padding:15,
        fontSize:14,
        fontWeight:'300',
        height:'15%'
    },
    boton_encuesta_padre:{
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        justifyContent:'center',
        height:'10%',
        backgroundColor:'transparent'
    },
    boton_encuesta:{
        backgroundColor:'#FF4500',
        width:'43%',

    },
    boton_en:{
        padding:10,
        textAlign:'center',
        fontSize:15,
        color:'white',
        fontWeight:'500',


    },
});

export default ModalExample;
