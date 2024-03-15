import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Pressable, Text, Modal, ScrollView, View } from 'react-native';

import PlayersScreen from './Views/PlayersScreen';
import GamesScreen from './Views/GamesScreen';
import QuestionScreen from './Views/QuestionScreen';

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
            headerShown: false
          }}
          initialParams={{ setPlayers }}
        />
        <Stack.Screen
          name="Games"
          component={GamesScreen}
          options={{
            title: 'Selección de Juegos',
            headerShown: false
          }}
        />
        <Stack.Screen
          name="QuestionScreen"
          component={QuestionScreen}
          options={{
            title: 'Pregunta',
            headerShown: false
          }}
        />
      </Stack.Navigator>
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
});
