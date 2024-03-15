import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Footer from './../Components/Footer';
import GameTitle from '../Components/GameTitle';

const QuestionScreen = ({ route, navigation }) => {
    const { category } = route.params; 
    const { players } = route.params;

    const [categoryName, setCategoryName] = useState('');
    const [playerNames, setPlayerNames] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');

    const flipAnimation = useState(new Animated.Value(0))[0];

    // Preguntas para el juego estilo tomanji
    const tomanjiQuestions = [
        "Toma 1",
        "Toma 2",
        "Toma 3",
        "Toman todos",
        "Toma el de la izquierda",
        "Toma el de la derecha",
        "Regala 3 sorbos",
        "Nunca Nunca",
        "Tapita puritana",
        "Cascada",
        "Toman los hombres",
        "Cultura chupistica",
        "regla N° 1",
        "Toma 2",
        "Toman las mujeres",
        "todos toman",
        "Toma la cantidad de personas que hay en la mesa",
        "Dedo",
        "Cultura chupistica",
        "historia",
        "Toma del de la derecha",
        "Nunca nunca",
        "Toma los que tienen hermana",
        "Toma el de la derecha",
        "toma la cantidad de personas que hay en la mesa",
        "AFRICANO",
        "Toma el de la izquierda",
        "Chanco inflado",
    ];
    //hice hasta el 28

    // Preguntas para el juego "¿Qué prefieres?"
    const preferenceQuestions = [
        "¿Qué prefieres, Coca-Cola o Pepsi?",
        "¿Qué prefieres, perros o gatos?",
        "¿Qué prefieres, pizza o hamburguesa?",
        "¿Qué prefieres, playa o montaña?",
    ];

    useEffect(() => {
        setCategoryName(category);
        setPlayerNames(players);

        // Seleccionar una pregunta aleatoria según la categoría
        if (category === 'juego1') {
            const randomIndex = Math.floor(Math.random() * tomanjiQuestions.length);
            setCurrentQuestion(tomanjiQuestions[randomIndex]);
        } else if (category === 'juego2') {
            const randomIndex = Math.floor(Math.random() * preferenceQuestions.length);
            setCurrentQuestion(preferenceQuestions[randomIndex]);
        }
    }, []);

    const handleNextQuestion = () => {
        Animated.sequence([
            Animated.timing(flipAnimation, {
                toValue: 1, // Rota la tarjeta 90 grados
                duration: 250, // Duración de la primera mitad de la animación
                useNativeDriver: true,
            }),
            Animated.timing(flipAnimation, {
                toValue: 0, // Rota la tarjeta de regreso a 0 grados
                duration: 250, // Duración de la segunda mitad de la animación
                useNativeDriver: true,
            }),
        ]).start(() => {
            if (category === 'juego1') {
                const randomIndex = Math.floor(Math.random() * tomanjiQuestions.length);
                setCurrentQuestion(tomanjiQuestions[randomIndex]);
            } else if (category === 'juego2') {
                const randomIndex = Math.floor(Math.random() * preferenceQuestions.length);
                setCurrentQuestion(preferenceQuestions[randomIndex]);
            }
        });
    };

    return (
        <ImageBackground source={require('./../assets/Simple Blue.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <GameTitle message="Pregunta" />

                <Animated.View style={[styles.questionContainer, { transform: [{ rotateY: flipAnimation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }]}>
                    
                    <View style={styles.singleQuestionContainer}>
                        <Text style={styles.title}>{categoryName}</Text>
                        <Text style={styles.question}>{currentQuestion}</Text>
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
});

export default QuestionScreen;
