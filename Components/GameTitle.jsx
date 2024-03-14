// GameTitle.js

import React from 'react';
import { View, Text } from 'react-native';
import Footer from './Footer'; // Asegúrate de importar correctamente el componente Footer si está en la misma carpeta

const GameTitle = ({ message }) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleEmoji}>🍹</Text>
            <View style={styles.titleBox}>
            <Text style={styles.title}>{message}</Text>
                <Text style={[styles.title, styles.gameTitle]}>DrunkGame</Text>
                <Footer /> 
            </View>
        </View>
    );
};

const styles = {
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
    },
    titleBox: {
        marginLeft: 10,
        alignItems: 'center',
    },
    titleEmoji: {
        fontSize: 50,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
    },
    gameTitle: {
        fontSize: 25,
        color: '#f3c623',
    },
};

export default GameTitle;
