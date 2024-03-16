import React from 'react';
import { Modal, ScrollView, Text, Pressable, StyleSheet, View } from 'react-native'; // Añade View aquí

const PlayersModal = ({ visible, players, onClose }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <ScrollView style={styles.modalContent}>
                    {players.map((player, index) => (
                        <Text key={index} style={styles.modalPlayer}>{player}</Text>
                    ))}
                    <Text style={styles.modalPlayerSecond}>Añade o elimina participantes desde la pantalla anterior</Text>
                </ScrollView>
                <Pressable style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.closeButtonText}>Cerrar</Text>
                </Pressable>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
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

export default PlayersModal;
