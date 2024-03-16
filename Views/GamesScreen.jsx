import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GameTitle from './../Components/GameTitle';
import PlayersModal from './../Components/PlayersModal'; // Importa el componente PlayersModal


const backgroundImg = require('./../assets/Simple Blue.png');

const GamesScreen = ({ navigation }) => {
    const route = useRoute();

    const { players } = route.params;
    const [showPlayersModal, setShowPlayersModal] = useState(false);

    const handleGameSelection = (game) => {
        console.log(`Juego seleccionado: ${game}`);
        navigation.navigate('QuestionScreen', { 
            category: game, 
            players: players 
        });
    };

    const handleTogglePlayersPress = () => {
        setShowPlayersModal(!showPlayersModal);
    };

    return (
        <ImageBackground source={backgroundImg} style={styles.background}>
            <View style={styles.container}>
                <GameTitle message="Juguemos a" />

                <View style={styles.backButton}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                </View>

                <Pressable style={styles.toggleButton} onPress={handleTogglePlayersPress}>
                    <Text style={styles.toggleButtonText}>Mostrar participantes</Text>
                    <Ionicons name="people" size={24} color="#4ecdc4" />
                </Pressable>

                <View style={[styles.gameContainer, { backgroundColor: '#12375c' }]}>
                <Pressable style={[styles.gameButton, { backgroundColor: '#f37121' }]} onPress={() => handleGameSelection('Tomanji')}>
                        <Text style={[styles.buttonText, { fontSize: 16 }]}>Tomanji 🎲</Text>
                    </Pressable>
                    <Pressable style={[styles.gameButton, { backgroundColor: '#f8961e' }]} onPress={() => handleGameSelection('¿Qué prefiere?')}>
                        <Text style={[styles.buttonText, { fontSize: 16 }]}>¿Qué prefiere? 🤔</Text>
                    </Pressable>
                    <Pressable style={[styles.gameButton, styles.disabledButton]} disabled>
                        <Text style={[styles.buttonText, { fontSize: 16 }]}>????</Text>
                    </Pressable>
                    <Pressable style={[styles.gameButton, styles.disabledButton]} disabled>
                        <Text style={[styles.buttonText, { fontSize: 16 }]}>?????</Text>
                    </Pressable>
                </View>

                <PlayersModal
                    visible={showPlayersModal}
                    players={players}
                    onClose={() => setShowPlayersModal(false)}
                />
            </View>
        </ImageBackground>
    );
};


const windowWidth = Dimensions.get('window').width;

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
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50, // Ajustar la posición hacia abajo
        left: 20,
    },
    toggleButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleButtonText: {
        marginRight: 5,
        color: '#fff',
        fontWeight: 'bold',
    },
    gameContainer: {
        backgroundColor: '#262335',
        borderRadius: 10,
        padding: 10,
        marginVertical: 20,
        width: '80%',
    },
    gameButton: {
        backgroundColor: '#4ecdc4',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        marginVertical: 10,
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
        textAlign: 'center',
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
    disabledButton:{
        backgroundColor: '#6c6977',
    }
});

export default GamesScreen;
