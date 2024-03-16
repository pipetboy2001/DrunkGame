import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GameTitle from '../Components/GameTitle';
import PlayersModal from './../Components/PlayersModal'; // Importa el componente PlayersModal

import { Ionicons } from '@expo/vector-icons';

const QuestionScreen = ({ route, navigation }) => {
    const { category } = route.params;
    const { players } = route.params;

    const [showPlayersModal, setShowPlayersModal] = useState(false);


    // Objeto que mapea cada categoría a su conjunto de preguntas
    const categoryQuestions = {
        'Tomanji': [
            "Toma 1",
            "Toma 2",
            "Toma 3",
            "Toman todos",
            "Toma el de la izquierda",
            "Toma el de la derecha",
            "Regala 3 sorbos",
            "Nunca Nunca"
        ],
        // Agrega más categorías aquí según sea necesario
        '¿Qué prefiere?': [
            "¿Qué prefieres, Coca-Cola o Pepsi?",
            "¿Qué prefieres, perros o gatos?",
            "¿Qué prefieres, pizza o hamburguesa?",
            "¿Qué prefieres, playa o montaña?",
        ]
    };

    // Estado para almacenar las preguntas de la categoría seleccionada
    const [questions, setQuestions] = useState(categoryQuestions[category] || []);

    // Estado para controlar la animación de la tarjeta
    const [flipAnimation] = useState(new Animated.Value(0));

    // Estado para mantener el índice de la pregunta actual
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Estado para mantener el índice del participante actual
    const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);

    const handleNextQuestion = () => {
        // Incrementa el índice de la pregunta actual
        setCurrentQuestionIndex((currentQuestionIndex + 1) % questions.length);
        // Cambia al siguiente participante
        setCurrentParticipantIndex((currentParticipantIndex + 1) % players.length);
    };

    return (
        <ImageBackground source={require('./../assets/Simple Blue.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowPlayersModal(true)} style={styles.showPlayersButton}>
  <Ionicons name="people" size={24} color="#4ecdc4" />
</TouchableOpacity>


                <PlayersModal
                    visible={showPlayersModal}
                    players={players}
                    onClose={() => setShowPlayersModal(false)}
                />

                <GameTitle message="Pregunta" />
                <Animated.View style={[styles.questionContainer, { transform: [{ rotateY: flipAnimation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }]}>
                    <Text style={styles.title}>{category}</Text>
                    <View style={styles.singleQuestionContainer}>
                        {questions && questions.length > 0 && <Text style={styles.question}>
                            {players[currentParticipantIndex]}  -  {questions[currentQuestionIndex]}</Text>}
                    </View>
                    <TouchableOpacity onPress={handleNextQuestion} style={styles.nextButton}>
                        <Text style={styles.nextButtonText}>Siguiente</Text>
                    </TouchableOpacity>
                </Animated.View>

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    questionContainer: {
        backgroundColor: '#8630df',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backfaceVisibility: 'hidden', // Oculta la parte trasera de la tarjeta
    },
    categoryImage: {
        width: 30,
        height: 30,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    singleQuestionContainer: {
        marginBottom: 20,
    },
    question: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    nextButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 20,
    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8630df',
    },
    showPlayersButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
      },
      showPlayersButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',
      },
});

export default QuestionScreen;
