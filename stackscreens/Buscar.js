// En stackscreens/Buscar.js
import React from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';

const Pruebas = ({ navigation }) => {
  return (
    <View>
      <Text>Pantalla de Pruebas</Text>
      <Button
        title="Ir a Detalles"
        onPress={() => navigation.navigate('Details')}
      />

    </View>
  );
};

export default Pruebas; // Asegúrate de exportarlo correctamente