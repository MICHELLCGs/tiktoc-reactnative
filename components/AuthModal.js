import React from 'react';
import { View, Text, Modal, Button } from 'react-native';

const AuthModal = ({ visible, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
          <Text style={{ fontSize: 18, marginBottom: 15, textAlign: 'center' }}>
            Debes iniciar sesión para acceder a esta funcionalidad.
          </Text>
          <Button title="Iniciar Sesión" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default AuthModal;
