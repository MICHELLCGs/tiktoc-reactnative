import { StyleSheet, Dimensions } from 'react-native';

const { height: viewportHeight } = Dimensions.get('window');
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    container_hijo:{
        backgroundColor:'transparent',
        width:'80%',
        height:'79%',
        display:'flex',
    },
    Titulo:{
        backgroundColor:'transparent',
        width:'100%',
        textAlign:'center',
        padding:15,
        fontWeight:'600',
        fontSize:18
    },
    Titulo2:{
        backgroundColor:'transparent',
        width:'100%',
        textAlign:'center',
        padding:30,
        fontWeight:'500',
        fontSize:17
    } ,
    Monedas_Padre:{
        backgroundColor:'transparent',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        height:'20%'
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
        padding:15
    },
    Pregunta_mo:{
        backgroundColor:'transparent',
        padding:18,
        textAlign:'center',
        fontSize:17,
        fontWeight:'500',
    },
    texto_grande:{
        backgroundColor:'transparent',
        textAlign:'center',
        padding:15,
        fontSize:15,
        fontWeight:'300',
        height:'20%'
    },
    boton_encuesta_padre:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'13%'
    },
    boton_encuesta:{
        backgroundColor:'#FF4500',
        width:'55%',

    },
    boton_en:{
        padding:10,
        textAlign:'center',
        fontSize:15,
        color:'white',
        fontWeight:'500',


    },
    
});