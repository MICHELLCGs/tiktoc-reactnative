import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import styles from './styles/MonedasStyle';

const Monedas = ({ navigation }) => {
    const preguntas = [
        {
          titulo: 'Nombre de pelicula 1',
          pregunta: '¿Quién dirigió "Inception"?',
          opciones: ['Christopher Nolan', 'Steven Spielberg', 'Quentin Tarantino', 'James Cameron'],
          respuestaCorrecta: 'Christopher Nolan',
          imagen: require('../../assets/image26.png'),
        },
        {
          titulo: 'Nombre de pelicula 2',
          pregunta: '¿En qué año se estrenó "Titanic"?',
          opciones: ['1995', '1997', '2000', '1999'],
          respuestaCorrecta: '1997',
          imagen: require('../../assets/image26.png'),
        },
        {
          titulo: 'Nombre de pelicula 3',
          pregunta: '¿Quién protagonizó la película "Forrest Gump"?',
          opciones: ['Tom Hanks', 'Leonardo DiCaprio', 'Matt Damon', 'Brad Pitt'],
          respuestaCorrecta: 'Tom Hanks',
          imagen: require('../../assets/image26.png'),
        },
        {
          titulo: 'Nombre de pelicula 4',
          pregunta: '¿Cuál es el nombre del personaje interpretado por Keanu Reeves en "The Matrix"?',
          opciones: ['Neo', 'John Wick', 'Morpheus', 'Trinity'],
          respuestaCorrecta: 'Neo',
          imagen: require('../../assets/image26.png'),
        },
        {
          titulo: 'Nombre de pelicula 5',
          pregunta: '¿Qué actor interpretó a Jack Dawson en "Titanic"?',
          opciones: ['Leonardo DiCaprio', 'Brad Pitt', 'Johnny Depp', 'Tom Cruise'],
          respuestaCorrecta: 'Leonardo DiCaprio',
          imagen: require('../../assets/image26.png'),
        },
        {
          titulo: 'Nombre de pelicula 6',
          pregunta: '¿En qué ciudad se desarrolla la película "The Dark Knight"?',
          opciones: ['Gotham City', 'Metropolis', 'New York', 'Los Angeles'],
          respuestaCorrecta: 'Gotham City',
          imagen: require('../../assets/image26.png'),
        },
        {
          titulo: 'Nombre de pelicula 7',
          pregunta: '¿Cuál es el nombre del dinosaurio protagonista en "Jurassic Park"?',
          opciones: ['Tyrannosaurus Rex', 'Velociraptor', 'Triceratops', 'Brachiosaurus'],
          respuestaCorrecta: 'Tyrannosaurus Rex',
          imagen: require('../../assets/image26.png'),
        },
        {
          titulo: 'Nombre de pelicula 8',
          pregunta: '¿Qué película ganó el Oscar a la Mejor Película en 2019?',
          opciones: ['Parasite', 'Once Upon a Time in Hollywood', '1917', 'Joker'],
          respuestaCorrecta: 'Parasite',
          imagen: require('../../assets/image26.png'),
        },
        {
          titulo: 'Nombre de pelicula 9',
          pregunta: '¿En qué año se estrenó "Avatar"?',
          opciones: ['2007', '2009', '2010', '2012'],
          respuestaCorrecta: '2009',
          imagen: require('../../assets/image26.png'),
        },
        {
          titulo: 'Nombre de pelicula 10',
          pregunta: '¿Quién dirigió "Pulp Fiction"?',
          opciones: ['Quentin Tarantino', 'Martin Scorsese', 'Francis Ford Coppola', 'Stanley Kubrick'],
          respuestaCorrecta: 'Quentin Tarantino',
          imagen: require('../../assets/image26.png'),
        },
      ];

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [fallos, setFallos] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  const handleSiguiente = () => {
    if (respuestaSeleccionada === preguntas[preguntaActual].respuestaCorrecta) {
      setPuntaje(puntaje + 1);
    } else {
      setFallos(fallos + 1);
    }

    // Resetea la selección
    setRespuestaSeleccionada(null);

    // Si hemos llegado a la última pregunta
    if (preguntaActual + 1 >= preguntas.length) {
      // Evaluamos después de que el usuario haya completado todas las preguntas
      if (fallos + (respuestaSeleccionada !== preguntas[preguntaActual].respuestaCorrecta ? 1 : 0) > 3) {
        navigation.navigate('Derrota', { puntaje });
      } else {
        navigation.navigate('Victoria', { puntaje });
      }
    } else {
      // Avanzamos a la siguiente pregunta
      setPreguntaActual(preguntaActual + 1);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.Titulo}>{preguntaActual}/10</Text>
        

      <View style={styles.container_hijo}>

      
      
        <Text style={styles.Titulo}>{preguntas[preguntaActual].titulo}</Text>
        <Text style={styles.pregunta}>{preguntas[preguntaActual].pregunta}</Text>

        {/* Mostrar la imagen de la película */}
        <Image
          source={preguntas[preguntaActual].imagen}
          style={styles.imagen}  // Asegúrate de agregar un estilo para la imagen
        />

            <View style={styles.opciones}>
            {preguntas[preguntaActual].opciones.map((opcion, index) => (
                <TouchableOpacity
                key={index}
                style={[
                    styles.boton_opcion,
                    respuestaSeleccionada === opcion && styles.opcion_seleccionada,
                    { width: '48%', marginBottom: 10 }, // Asegura que cada opción ocupe el 48% del ancho
                ]}
                onPress={() => setRespuestaSeleccionada(opcion)}
                >
                <Text style={styles.texto_opcion}>{opcion}</Text>
                </TouchableOpacity>
            ))}
            </View>

        <View style={styles.boton_siguiente}>
          <TouchableOpacity
            style={[styles.boton_encuesta, !respuestaSeleccionada && styles.boton_desactivado]}
            onPress={handleSiguiente}
            disabled={!respuestaSeleccionada}
          >
            <Text style={styles.boton_en}>Siguiente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Monedas;