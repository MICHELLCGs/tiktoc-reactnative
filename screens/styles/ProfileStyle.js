import { StyleSheet, Dimensions } from 'react-native';
const { height: viewportHeight } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
      },
      container_int:{
        backgroundColor:'white',
        width:'100%',
        top:45,
        display:'flex',
        alignItems:'center'
      },    
      topBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        
        gap:23,
        
        padding: 10,
        
        backgroundColor:'white',
        width:'90%',
      },
      menu: {
       
        
        right: 21,
        width:100,
        backgroundColor: 'white',
       zIndex:999,
        borderRadius: 5,
        position:'absolute'
        
        
      },
      Perfilimage:{
        backgroundColor:'white',
        width:'100%',
        
        
        
      },
      profileImage: {
        width: 130,
        height: 130,
        backgroundColor:'white',
        borderRadius:70
      
      },
      perfilimage_int:{
            backgroundColor:'white',
            
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            height:200
      },
      perfilimage_int_perfil:{
        backgroundColor:'transparent',
        width:'33%',
        position:'relative',
        borderRadius:60
      },
      pen:{
        backgroundColor:'transparent',
        width:20,
        height:20,
        
      },
      confperfil:{
        backgroundColor:'#FF004F',
        position:'absolute',
        padding:8,
        bottom:0,
        borderRadius:50,
        right:0

      },
      perfilimage_int_datos:{
        backgroundColor:'white',
        width:'40%'
      },
      perfilimage_int_usuario:{
        backgroundColor:'white',

      },
      userName:{
        fontSize:17,
        fontWeight:'600',
        textAlign:'center',
        padding:5
      },
      perfilimage_int_nivel:{
        backgroundColor:'transparent'
      },
      perfilimage_int_nivel_int:{
        backgroundColor:'transparent',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:0
      },
      perfilimage_int_levelt_texto:{
        backgroundColor:'transparent',
        textAlign:'center',
        fontSize:20,
        fontWeight:'600',
        width:18
      },
      textoprin:{
        textAlign:'center',
        padding:6
      },
      perfilimage_int_levelt:{
        backgroundColor:'transparent',
        width:'30%',
        
        

      },
      profileImage2:{
          width:45,
          height:45,
          backgroundColor:'transparent'

      },
      level: {
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center',
      },
      horizontalLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#FF4500',
        width: '80%',
        marginVertical: 20,
      },
      statsContainer: {
        
        display:'flex',
        justifyContent:'center',
        gap:30,
        flexDirection: 'row',
        alignItems:'center',
        width: '100%',
        
        backgroundColor:'transparent',
        borderTopWidth: 3, // Ancho del borde superior
        borderBottomWidth: 3, // Ancho del borde inferior
        borderColor: '#FF004F', // Color del borde
      },


      stat: {
        backgroundColor:'transparent',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:12,

      },
      stat_int:{
        backgroundColor:'transparent',
        display:'flex',
        flexDirection:'row',
        gap:15
      },
      stat_int_bot_letra_letra:{
        padding:4,
        fontSize:14,
        backgroundColor:'white'
      },
      stat_int_bot_letra_letra2:{
        padding:8,
        fontSize:14,
        backgroundColor:'white'
      },
      stat_int_bot:{
        backgroundColor:'transparent',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      },
      profileImage_modenad:{
        width:50,
        height:50
      },
      profileImage_modenad2:{
        width:38,
        height:38,
        backgroundColor:'transparent',
        marginBottom:12
        
      },
      stat_int_bot_letra:{
        backgroundColor:'white',
        color:'black',
        fontSize:23,
        fontWeight:'600',
        justifyContent:'center',
        alignItems:'center'
      },
      interactionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor:'white'
      },
      iconButton: {
        alignItems: 'center',
        padding: 15,
        backgroundColor:'white',
        
        width:'38%'
      },
      homelogin_s: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', // Centramos verticalmente
        backgroundColor: 'transparent',
        width: '100%',
        flex: 1, // Asegura que ocupe todo el espacio disponible
      },
      loginText: {
        fontSize: 20,
        width: '80%',
        textAlign: 'center',
      },
      boton_home: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
    
        width: '80%',
        backgroundColor: 'transparent',
        marginTop: 20,
        padding: 20,
      },
    
      buttonTexts: {
        textAlign: 'center',
        backgroundColor: 'transparent',
        width: '95%',
        fontSize: 17,
      },

      contentContainer:{
        backgroundColor:'white',
        width:'100%',
        height:'70%'
      }
      ,
      buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Permitir que los botones se envuelvan a la siguiente línea
        justifyContent: 'space-between', // Espacio uniforme entre los botones
      },
      button: {
        width: '30%', // Tres botones por fila
        height:200,
       
        backgroundColor: 'white',
        margin:6,
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
      },
      image:{
        width:'100%',
        height:'100%'
      },

      contenedor_general_enc:{
        backgroundColor:'white',
        width:'100%',
        height:200,
        margin:2,
        display:'flex',
        flexDirection:'row',
        gap:10,
        justifyContent:'center',
        borderBottomWidth: 2, // Ancho del borde inferior
        borderBottomColor: 'gray', // Color del borde i
      },
      content_int_:{
        backgroundColor:'white',
        width:'45%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      },
      title_peliculas:{
        fontSize:16,
        padding:5,
        fontWeight:'500'

      },
      image_segundo_b:{
        width:'80%',
        height:'80%'
      }
      ,
      text_inf_p:{
        backgroundColor:'white',
        textAlign:'center',
        padding:10
        
      },
      btn_mas:{
        backgroundColor:'white',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:10
      },
      btnText_con:{
        backgroundColor:'#FF4500',
        padding:10,
        width:'50%',
        textAlign:'center',
        fontWeight:'500',
        color:'white'
      }
  });