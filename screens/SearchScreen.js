import React from 'react';
import { View, Text, StyleSheet,Button } from 'react-native';

const SearchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Pantalla de Búsqueda</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchScreen;
