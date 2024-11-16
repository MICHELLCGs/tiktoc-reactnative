import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../authentication/AuthContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditProfileScreen = ({ navigation }) => {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [birthday, setBirthday] = useState(user?.birthday || ''); 
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [phone, setPhone] = useState(user?.phone || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || ''); // Estado para la imagen de perfil

  const handleSave = () => {
    if (!birthday) {
      Alert.alert("Error", "Por favor ingresa una fecha de nacimiento válida.");
      return;
    }
    updateUserProfile({ name, nickname, birthday, email, password, phone, profileImage });
    navigation.goBack();
  };

  // Función para formatear la entrada del usuario a una fecha en formato DD/MM/YYYY
  const handleDateChange = (text) => {
    // Elimina caracteres no numéricos
    const formattedText = text.replace(/[^\d]/g, '');
    let date = formattedText;

    // Agrega separadores después de cada 2 y 4 caracteres
    if (formattedText.length >= 2) {
      date = `${formattedText.slice(0, 2)}/${formattedText.slice(2)}`;
    }
    if (formattedText.length >= 5) {
      date = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}/${formattedText.slice(4, 8)}`;
    }

    setBirthday(date);
  };

  return (
    <View style={styles.container}>
      {/* Eliminar la opción para cambiar la imagen de perfil */}
      <Image
        source={profileImage ? { uri: profileImage } : require('../assets/default-avatar.png')}
        style={styles.profileImage}
      />

      <Text>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingresa tu nombre"
      />

      <Text>Nombre de Usuario</Text>
      <TextInput
        style={styles.input}
        value={nickname}
        onChangeText={setNickname}
        placeholder="Ingresa tu nombre de usuario"
      />

      <Text>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Ingresa tu teléfono"
        keyboardType="phone-pad"
      />

      {/* Fecha de nacimiento */}
      <Text>Fecha de Nacimiento</Text>
      <TextInput
        style={styles.input}
        value={birthday}
        onChangeText={handleDateChange} // Función para manejar la entrada de fecha
        placeholder="Fecha de nacimiento (DD/MM/AAAA)"
        maxLength={10} // Limita la entrada a 10 caracteres (DD/MM/YYYY)
        keyboardType="numeric" // Solo permite números
      />

      <Text>Correo</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingresa tu correo"
        keyboardType="email-address"
      />

      <Text>Contraseña</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Ingresa tu nueva contraseña"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="black" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#FF4500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
