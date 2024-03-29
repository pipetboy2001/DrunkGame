import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, ImageBackground, Platform, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import GameTitle from '../Components/GameTitle';

const backgroundImg = require('./../assets/Simple Blue.png');

const isDesktop = Platform.OS === 'web' && Dimensions.get('window').width > 768;

const PlayersScreen = () => {
    const [playerName, setPlayerName] = useState('');
    const [players, setPlayers] = useState([]);
    const navigation = useNavigation();

    const goToGamesScreen = () => {
        console.log("Selected players:", players);
        navigation.navigate('Games', { players });
    };

    useEffect(() => {
        const loadPlayers = async () => {
            try {
                const storedPlayers = await AsyncStorage.getItem('players');
                if (storedPlayers !== null) {
                    setPlayers(JSON.parse(storedPlayers));
                }
            } catch (error) {
                console.error('Error loading players from AsyncStorage:', error);
            }
        };
        loadPlayers();
    }, []);

    const addPlayer = () => {
        if (playerName.trim() !== '') {
            const newPlayers = [...players, playerName];
            setPlayers(newPlayers);
            setPlayerName('');
            AsyncStorage.setItem('players', JSON.stringify(newPlayers));
        }
    };

    const removePlayer = (index) => {
        const newPlayers = [...players];
        newPlayers.splice(index, 1);
        setPlayers(newPlayers);
        AsyncStorage.setItem('players', JSON.stringify(newPlayers));
    };

    const canAdvance = players.length >= 2;
    const buttonText = canAdvance ? "¡Jugar!" : `Agregue ${2 - players.length} personas más`;


    return (
        <ImageBackground source={backgroundImg} style={styles.background}>
            <View style={styles.container}>
                <GameTitle message="Bienvenidos a" />
                <View style={[styles.blueContainer, isDesktop && { width: '60%' }]}>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="person" size={24} color="#4ecdc4" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Añadir a los jugadores"
                            value={playerName}
                            onChangeText={(text) => setPlayerName(text)}
                        />
                        <Pressable style={styles.addButton} onPress={addPlayer}>
                            <Text style={styles.buttonText}>+</Text>
                        </Pressable>
                    </View>
                    <ScrollView style={styles.playersListContainer}>
                        {players.map((player, index) => (
                            <View key={index} style={styles.playerItem}>
                                <Text style={styles.playerText}>{player}</Text>
                                <Pressable onPress={() => removePlayer(index)}>
                                    <Text style={styles.removeButton}>X</Text>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                    <Pressable 
                        style={[styles.playButton, !canAdvance && { opacity: 0.5 }]}
                        onPress={canAdvance ? goToGamesScreen : undefined} // Evita la acción si no se cumplen las condiciones
                        disabled={!canAdvance} // Deshabilita el botón si no se cumplen las condiciones
                    >
                        <Text style={styles.playButtonText}>{buttonText}</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    blueContainer: {
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#12375c',
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#4ecdc4',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: '#fff',
    },
    addButton: {
        backgroundColor: '#4ecdc4',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    playersListContainer: {
        height: 250,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#2064a8',
    },
    playerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4ecdc4',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 5,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    playerText: {
        fontWeight: 'bold',
    },
    removeButton: {
        color: 'red',
        fontWeight: 'bold',
    },
    playButton: {
        backgroundColor: '#4ecdc4',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PlayersScreen;
