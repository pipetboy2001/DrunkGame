import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable, Text, Modal, ScrollView, View } from 'react-native';

import PlayersScreen from './Views/PlayersScreen';
import GamesScreen from './Views/GamesScreen';

const Stack = createStackNavigator();

export default function App() {
  const [players, setPlayers] = useState([]);
  const [showPlayers, setShowPlayers] = useState(false);

  const handleTogglePlayersPress = () => {
    setShowPlayers(!showPlayers);
    console.log('Participantes:', players);
  };

  const handleCloseModal = () => {
    setShowPlayers(false);
  };

  // Usar useEffect para imprimir los jugadores cuando se actualizan
  useEffect(() => {
    console.log('Participantes:', players);
  }, [players]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Players"
          component={PlayersScreen}
          options={{
            title: 'Selección de Jugadores',
            headerShown: false // Esta línea oculta la barra superior
          }}
          initialParams={{ setPlayers }}
        />

        <Stack.Screen
          name="Games"
          component={GamesScreen}
          options={{
            title: 'Selección de Juegos',
            headerShown: false // Esta línea oculta la barra superior
          }}
        />


      </Stack.Navigator>
      <Modal visible={showPlayers} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            {players.map((player, index) => (
              <Text key={index} style={styles.modalPlayer}>{player}</Text>
            ))}
            <Text style={styles.modalPlayerSecond}>Añade o elimina participantes desde la pantalla anterior</Text>
          </ScrollView>
          <Pressable style={styles.closeButton} onPress={handleCloseModal}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      </Modal>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    marginRight: 10,
    padding: 10,
  },
  headerButtonText: {
    color: '#4ecdc4',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalPlayer: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    alignSelf: 'center',
  },
  modalPlayerSecond: {
    color: 'gray',
    marginBottom: 10,
    textAlign: 'center',
    alignSelf: 'center',
  },
  closeButton: {
    backgroundColor: '#4ecdc4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
