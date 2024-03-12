import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, StyleSheet, Platform, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlayersScreen = () => {
    const [playerName, setPlayerName] = useState('');
    const [players, setPlayers] = useState([]);
    const isDesktop = Platform.OS === 'web' && Dimensions.get('window').width > 768;

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

    return (
        <View style={[styles.container, isDesktop && styles.containerDesktop]}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleEmoji}>🍹</Text>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>Bienvenidos a</Text>
                    <Text style={[styles.title, styles.gameTitle]}>DrunkGame</Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
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

            <ScrollView style={[styles.playersList, !isDesktop && styles.playersListMobile]}>
                {players.map((player, index) => (
                    <View key={index} style={styles.playerItem}>
                        <Text style={styles.playerText}>{player}</Text>
                        <Pressable onPress={() => removePlayer(index)}>
                            <Text style={styles.removeButton}>X</Text>
                        </Pressable>
                    </View>
                ))}
            </ScrollView>

            <Pressable style={styles.playButton}>
                <Text style={styles.buttonText}>Jugar!</Text>
            </Pressable>

            <View style={styles.creatorContainer}>
                <Text style={styles.creatorText}>Creado por Pipetboy</Text>
            </View>

        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0',
    },
    containerDesktop: {
        width: '70%',
        maxWidth: 800,
        borderRadius: 20,
        padding: 20,
        margin: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    titleBox: {
        marginLeft: 10,
    },
    titleEmoji: {
        fontSize: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    gameTitle: {
        color: 'green',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#4ecdc4',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginRight: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addButton: {
        backgroundColor: '#4ecdc4',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    playersList: {
        width: '100%',
        flex: 1,
        marginBottom: 20,
        backgroundColor: 'green',
        borderRadius: 10,
        padding: 10,
    },
    playersListMobile: {
        maxHeight: '40%', // Ajusta este valor según sea necesario
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
        backgroundColor: 'white',
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
        paddingVertical: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    creatorContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 20,
    },
    creatorText: {
        fontSize: 12,
        color: 'gray',
    },

});

export default PlayersScreen;
