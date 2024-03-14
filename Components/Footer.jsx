import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Importa el ícono de Feather

const Footer = () => {
  const handleGithubLink = () => {
    Linking.openURL('https://github.com/pipetboy2001');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGithubLink} style={styles.touchable}>
        {/* Agrega el ícono de GitHub */}
        <Feather name="github" size={16} color="#FFFFFF" style={styles.icon} />
        <Text style={styles.text}>
          Hecho por{" "}
          <Text style={styles.link}>Pipetboy</Text>, versión 1.0.0
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  touchable: {
    flexDirection: 'row', // Alinea el ícono y el texto en una fila
    alignItems: 'center', // Centra verticalmente el ícono y el texto
  },
  text: {
    fontSize: 12,
    color: '#888',
  },
  link: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  icon: {
    marginRight: 5, // Añade un espacio entre el ícono y el texto
  },
});

export default Footer;
