import { StyleSheet, Dimensions } from 'react-native';
const { height: viewportHeight } = Dimensions.get('window');
export default StyleSheet.create({
    dragIndicator: {
      
      height: 4,
      
      borderRadius: 2,
      marginTop: 15,
      display:'flex',
      alignItems:'center',
      paddingBottom:15

  },
  dragIndicator2: {
    width: 50,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 2,
    marginTop: 0,
    

},
    moneda:{
      backgroundColor:'#9c9d9fc0',
      borderRadius:10,
      width:'22%',
      display:'flex',
      gap:24,
      flexDirection:'row',
      left:20,
      margin:10,
      padding:5,
    },
    buscar_top:{
      backgroundColor:'transparent',
      margin:5,
      width:'13%',
      
      position:'absolute',
      right:0
    },
    cabe:{
      backgroundColor:'transparent',
      width:'100%',
      paddingTop: 30,
      position:'absolute',
      zIndex:999
    },
    cabetop:{
      display:'flex',
      flexDirection:'row',
      backgroundColor:'transparent',
      height:55,
      width:'100%',
      zIndex:999
      
    },
    carouselContainer: {
        
      backgroundColor:'transparent'
    },
    videoContainer: {
      height: viewportHeight,
      
      backgroundColor: 'blue',
      
    },
    videoWrapper: {
      width: '100%',
      height: '100%',
      backgroundColor:'black',
      
    },
    video: {
        width: '100%',
        height:'100%',
        
      
    },
    informacion:{
      backgroundColor:'transparent',
      position:'absolute',
      bottom:55,
      marginLeft:2,
      
    },
    informa_inter:{
      marginLeft:10,
      backgroundColor:'transparent',
      position:'relative'
    },
    iconWrapper: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: 50,
      width: 70,
      height: 70,
    },
    titulo:{
      backgroundColor:'transparent',
      fontWeight:'bold',
      fontSize:16,
      color:'white',
      left:15,
      width:'90%'
    },
    subtitu:{
      color:'white',
      backgroundColor:'transparent',
      width:'80%',
      fontSize:15,
      textShadowColor: 'black',
      textShadowRadius: 0,
      
      
    },
    informacion_usuario:{
        backgroundColor:'red',
        width:'100%',
        position:'absolute',
        
    },
  
    subida_video:{
      backgroundColor:'white',
      height:700,
      justifyContent:'center',
      alignItems:'center'
    },
  
    interno_subida:{
      backgroundColor:'transparent',
      width:'80%'
    },
    texf:{
      backgroundColor:'gray',
      color:'white',
      padding:10,
      borderRadius:18,
      
      borderColor:'black'
    },
  
    botones1:{
      marginTop:10,
      borderRadius:20,
      
      
    },
    titulo2:{
      fontWeight:'bold',
      fontSize:16,
      color:'black'
    },
  
    titulo3:{
      textAlign:'center',
      fontSize:20,
      padding:10
    },
  
  
  
    //login
    navigation:{
      backgroundColor:'orange'
    },
    rightContainer: {
      position: 'absolute',
      right: 20,
      top: '50%',
      transform: [{ translateY: -50 }],
      justifyContent: 'space-between',
      height: 200,
    },
    likeButton: {
      alignItems: 'center',
    },
    likeText: {
      color: 'white',
      marginTop: 5,
    },
    commentButton: {
      alignItems: 'center',
      position: 'absolute', // Mantener el botón de comentarios posicionado de forma absoluta
      top: 70, // Ajustamos para que quede justo abajo del like
    },
    commentText: {
      color: 'white',
      marginTop: 5,
    },
    /* Estilos para el Modal */
    modalBackground: {
      flex: 1,
      justifyContent: 'flex-end', // Para que el modal aparezca en la parte inferior
       // Fondo claro con opacidad rgba(0, 0, 0, 0.4)
    },
    modalContent: {
      backgroundColor: 'white', // Fondo blanco para modo claro
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      display:'flex',
      flexDirection:'column',
      height: '55%',
      justifyContent:'center',
      
      
    },
    coment:{
        backgroundColor:'transparent',
        height:'134%',
        position:'relative',
        padding:12,

    },
    input_padre:{
        backgroundColor:'transparent',
        height:'25%',
        display:'flex',
        flexDirection:'row',
        position:'relative',
        justifyContent:'center',
        
    },
    input_padre_hijo1:{
        backgroundColor:'transparent',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'85%'
    } , 
    input_padre_hijo2:{
        backgroundColor:'transparent',
        
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
        
        
    },
    modaltitle_padre:{
        backgroundColor:'transparent',
        
    },
    comentarios_:{
        backgroundColor:'tr',
        height:10,
    },
    modalTitle: {
      color: '#000', // Texto oscuro para modo claro
      fontSize: 18,
      fontWeight: 'bold',
      
      textAlign:'center',
      paddingBottom:5,
      paddingTop:5
    },
    commentItem: {
      flexDirection: 'colum',
      marginBottom: 10,
    },
    commentUser: {
      color: '#000', // Texto del usuario en color oscuro
      fontWeight: 'bold',
      fontSize:15
    },
    commentText: {
      color: '#333', // Texto de comentario en gris oscuro
        left:5,
        fontSize:14
    },
    commentInput: {
      backgroundColor: '#f0f0f0', // Fondo claro para el input
      color: '#000', // Texto oscuro en el input
      textAlign:'center',
      borderWidth: 2,            // Grosor del borde
        borderColor: 'rgb(77, 78, 79)',
      borderRadius: 17,
      
      width:'95%',
      height: 40,
      
      bottom:0
    },
    sendButton: {
      backgroundColor: '#FF4500', // Color característico de TikTok
      
      borderRadius: 20,
      
      
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    },
    sendButtonText: {
      color: '#fff', // Texto blanco en el botón de envío
      fontWeight: 'bold',
      fontSize: 23,
      padding:10
    },
    container:{
        backgroundColor:'orange',
        alignContent:'center'
    },
    nopermitido:{
      backgroundColor:'#8e89899d',
      display: 'flex', 
      flexDirection: 'row', 
      marginTop: 15, 
      gap: 10, 
      left: 30,
      justifyContent:'center',
      alignItems:'center',
      width:'70%',
      borderRadius:5
      
      

  }
  ,
  subtitu__:{
    color:'white',
    backgroundColor:'transparent',
    width:'80%',
    fontSize:15,
    textShadowColor: 'black',
    textShadowRadius: 0,
    padding:6,
    
  },
  });