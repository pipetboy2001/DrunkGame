import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GameTitle from '../Components/GameTitle';
import PlayersModal from './../Components/PlayersModal'; // Importa el componente PlayersModal
import { Ionicons } from '@expo/vector-icons';
import { db } from './../Database/Firebase'; // Importa el objeto db que representa tu base de datos Firestore

const QuestionScreen = ({ route, navigation }) => {
    const { category } = route.params;
    const { players } = route.params;

    const [showPlayersModal, setShowPlayersModal] = useState(false);
    // Estado para controlar la animación de la tarjeta
    const [flipAnimation] = useState(new Animated.Value(0));
    // Estado para mantener el índice del participante actual
    const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
    // Estado para mantener las preguntas de la categoría seleccionada
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Muestra el indicador de carga mientras se espera la obtención de datos
                setQuestions(['Cargando...']);
                //console.log("Obteniendo datos para la categoría:", category);
                const querySnapshot = await db.collection('Preguntas').doc(category).get();

                if (querySnapshot.exists) {
                    const questionsData = querySnapshot.data();
                    setQuestions(questionsData.questions || []);
                    console.log("Datos obtenidos:", questionsData);
                } else {
                    console.log("No se encontraron datos para la categoría:", category);
                    // Establecer el valor de questions como un array vacío si no se encontraron datos
                    setQuestions(['No se encontraron datos para la categoría seleccionada']);
                }
            } catch (error) {
                console.error("Error al obtener datos:", error);
                // Establecer el valor de questions como un array vacío en caso de error
                setQuestions(['Error al obtener datos']);
            }
        };
        // Llama a fetchData al principio y cada vez que category cambie
        fetchData();
    }, [category]);
    // Estado para mantener el índice de la pregunta actual
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Función para manejar el evento de presionar el botón "Siguiente"
    const handleNextQuestion = () => {
        // Incrementa el índice de la pregunta actual y vuelve al principio si alcanza el final de la lista
        setCurrentQuestionIndex((currentQuestionIndex + 1) % questions.length);
        // Cambia al siguiente participante
        setCurrentParticipantIndex((currentParticipantIndex + 1) % players.length);
    };

    // Función para manejar el evento de presionar el botón "Siguiente" con preguntas aleatorias
    const handleNextQuestionRandom = () => {
        // Selecciona un índice aleatorio dentro del rango de la lista de preguntas
        const randomIndex = Math.floor(Math.random() * questions.length);
        // Establece el índice de la pregunta actual como el índice aleatorio seleccionado
        setCurrentQuestionIndex(randomIndex);
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
        backfaceVisibility: 'hidden',
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
