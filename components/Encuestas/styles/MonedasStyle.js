import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: 
  { flex: 1,
     backgroundColor: 'white', 
     padding: 20,
     display:'flex',
     justifyContent:'center' 
},
  container_hijo: { 
    display:'flex',
    height:'80%',
    backgroundColor:'transparent',
    justifyContent:'center',
    alignItems:'center'
},
  Titulo: 
  { fontSize: 17, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  pregunta: { fontSize: 16, textAlign: 'center', marginVertical: 10 },
  opciones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor:'white',
    marginTop:20,
    width: '95%', // Asegura que ocupe el 100% del ancho disponible
  },
  boton_opcion: {
    
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 15,
    borderWidth: 3, // Grosor del borde
    borderColor: '#FF004F', // Color del borde
    marginBottom: 10, // Espacio entre las filas
  },
  opcion_seleccionada: {
    backgroundColor: '#FF7A49',
  },
  texto_opcion: {
    fontSize: 18,
    textAlign: 'center',
  },
  boton_siguiente: { marginTop: 20, alignItems: 'center' },
  boton_encuesta: {
    backgroundColor: '#6c63ff',
    padding: 12,
    width:'100%',
    textAlign:'center',
    backgroundColor:'#FF4500',
  },
  imagen:{
    width:'100%'
  },
  boton_en: { color: '#fff', 
    textAlign:'center',
    fontSize: 16, fontWeight: 'bold' },
  boton_desactivado: { backgroundColor: '#FF7A49' },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  tag: {
    backgroundColor: '#FF004F',
    color: '#fff',
    padding: 8,
    marginRight: 10,
    borderRadius: 20,
    fontSize: 12,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
});

export default styles;
