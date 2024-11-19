import { StyleSheet, Dimensions } from 'react-native';
const { height: viewportHeight } = Dimensions.get('window');
export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'transparent',
        display:'flex',
        
        alignItems:'center'
    },
    container_hijo:{
        top:50,
        backgroundColor:'white',
        borderRadius:15,
        width:'90%',
        height:'80%',
        display:'flex',
        alignItems:'center',
    },
    container_hijo_retro:{
        backgroundColor:'white',
        width:'85%',
        height:'12%',
        justifyContent:'center'

    },
    Titulo:{
        backgroundColor:'white',
        width:'70%',
        textAlign:'center',
        padding:25,
        fontWeight:'600',
        fontSize:18
    },
    image:{
        backgroundColor:'transparent',
        padding:15,
        
        
    },
   
    textinf:{
        backgroundColor:'white',
        width:'100%',
        textAlign:'center',
        padding:25,
        fontWeight:'500',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        gap:15
    } ,
    textoen:{
        backgroundColor:'white',
        width:'70%',
        display:'flex',
        justifyContent:'center',
        
    } ,
    textotext:{
        textAlign:'center',
        fontSize:14,
        
    },
    image__:{
        width:80,
        height:80
    },

    Moneda_:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        backgroundColor:'transparent',
        
        width:'15%',
        
        
    },
    plataformasss:{
        backgroundColor:'white',
        width:'100%',
        display:'flex',
        flexDirection:'row',
        gap:20,
        justifyContent:'center',
        padding:20
    },
    imageplatado:{
        width:85,
        height:85,
        backgroundColor:'white'
    },
    tituplat:{
        backgroundColor:'white',
        textAlign:'center',
        padding:2,
        fontSize:15,
        fontWeight:'500'
    }

  });