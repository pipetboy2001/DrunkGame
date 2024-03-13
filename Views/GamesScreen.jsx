import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar los iconos de Ionicons

const GamesScreen = ({ navigation }) => {
    const route = useRoute();

    const { players } = route.params;
    const showPlayersModal = route.params?.showPlayersModal;
    const [showPlayers, setShowPlayers] = useState(false);

    const handleGameSelection = (game) => {
        console.log(`Juego seleccionado: ${game}`);
    };

    const handleTogglePlayersPress = () => {
        console.log('Participantes:', players);
        setShowPlayers(!showPlayers);
    };

    const handleCloseModal = () => {
        setShowPlayers(false);
    };

    return (
        <View style={styles.container}>

            <View style={styles.backButton}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </Pressable>
            </View>


            <Pressable style={styles.toggleButton} onPress={handleTogglePlayersPress}>
                <Text style={styles.toggleButtonText}>Mostrar participantes</Text>
                <Ionicons name="people" size={24} color="#4ecdc4" />
            </Pressable>


            <View style={styles.gameContainer}>
    <Pressable style={styles.gameButton} onPress={() => handleGameSelection('juego1')}>
        <Text style={styles.buttonText}>Juego 1</Text>
    </Pressable>
    <Pressable style={styles.gameButton} onPress={() => handleGameSelection('juego2')}>
        <Text style={styles.buttonText}>Juego 2</Text>
    </Pressable>
    <Pressable style={styles.gameButton} onPress={() => handleGameSelection('juego3')}>
        <Text style={styles.buttonText}>Juego 3</Text>
    </Pressable>
    <Pressable style={styles.gameButton} onPress={() => handleGameSelection('juego4')}>
        <Text style={styles.buttonText}>Juego 4</Text>
    </Pressable>
</View>

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
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0',
    },
    toggleButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        flexDirection: 'row', // Para alinear el icono con el texto
        alignItems: 'center', // Para alinear el icono con el texto
    },
    toggleButtonText: {
        marginRight: 5, // Espaciado entre el texto y el icono
    },
    gameSelection: {
        marginTop: 30,
        justifyContent: 'center', // Alinear los botones verticalmente
        width: '90%', // Ancho total de la pantalla
    },
    gameButton: {
        backgroundColor: '#4ecdc4',
        paddingHorizontal: 20,
        paddingVertical: 30, // Ajustar el tamaño verticalmente
        borderRadius: 10,
        marginVertical: 10, // Espacio entre botones
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
        textAlign: 'center', // Centrar texto horizontalmente
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro con opacidad
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'black', // Fondo negro
        borderRadius: 10,
        padding: 20,
        maxHeight: '80%', // Altura máxima del modal
    },
    modalPlayer: {
        color: 'white', // Texto blanco
        marginBottom: 10,
        textAlign: 'center', // Centrar el texto horizontalmente
        alignSelf: 'center', // Centrar el componente horizontalmente
    },
    modalPlayerSecond: {
        color: 'gray',
        marginBottom: 10,
        textAlign: 'center', // Centrar el texto horizontalmente
        alignSelf: 'center', // Centrar el componente horizontalmente
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
    gameContainer: {
        backgroundColor: '#262335',
        borderRadius: 10,
        padding: 10,
        marginVertical: 20,
        width: '80%', // Ajuste del ancho al 80% de la pantalla
    },
    
});

export default GamesScreen;
