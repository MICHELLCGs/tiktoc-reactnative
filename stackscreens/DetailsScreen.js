import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Volver" onPress={() => navigation.goBack()} />
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

export default DetailsScreen;
