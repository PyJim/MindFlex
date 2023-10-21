import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const WordEasy = ({ navigation }) => {
    const [score, setScore] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [timer, setTimer] = useState(3);
    const [questionTimer, setQuestionTimer] = useState(3);
    const [questions, setQuestions] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const shuffledQuestions = shuffleQuestions([
            { "color": "Red", "inkColor": "blue" },
            { "color": "Green", "inkColor": "yellow" },
            { "color": "Blue", "inkColor": "red" },
            { "color": "Yellow", "inkColor": "green" },
            { "color": "Purple", "inkColor": "orange" },
            { "color": "Orange", "inkColor": "purple" },
            { "color": "Pink", "inkColor": "brown" },
            { "color": "Brown", "inkColor": "pink" },
            { "color": "Black", "inkColor": "white" },
            { "color": "White", "inkColor": "black" }
        ]);

        setQuestions(shuffleOptionsForQuestions(shuffledQuestions));
    }, []);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setTimer(0);
            startQuestionTimer();
        }
    }, [timer]);

    useEffect(() => {
        if (questionTimer > 0) {
            const interval = setInterval(() => {
                setQuestionTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setQuestionTimer(0);
            if (questionIndex < questions.length - 1) {
                setQuestionIndex((prevIndex) => prevIndex + 1);
                startQuestionTimer();
            } else {
                setGameOver(true);
            }
        }
    }, [questionTimer]);

    useEffect(() => {
        if (gameOver) {
            Alert.alert(
                'Game Over',
                `Your score: ${score}`,
                [
                    {
                        text: 'Replay',
                        onPress: () => {
                            setScore(0);
                            setQuestionIndex(0);
                            setTimer(3);
                            setQuestionTimer(5);
                            const shuffledQuestions = shuffleQuestions([...questions]);
                            setQuestions(shuffleOptionsForQuestions(shuffledQuestions));
                            setGameOver(false);
                        },
                    },
                    {
                        text: 'Exit',
                        onPress: () => {
                            navigation.navigate('Home');
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    }, [gameOver]);

    const startQuestionTimer = () => {
        setQuestionTimer(3);
    };

    const shuffleQuestions = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffleOptionsForQuestions = (questions) => {
        return questions.map((question) => {
            const options = shuffleQuestions([question.color, question.inkColor]);
            return { ...question, options };
        });
    };

    const handleAnswer = (selectedColor) => {
        const currentQuestion = questions[questionIndex];

        if (selectedColor === currentQuestion.color) {
            setScore((prevScore) => prevScore + 1);
        }

        if (questionIndex < questions.length - 1) {
            setQuestionIndex((prevIndex) => prevIndex + 1);
            startQuestionTimer();
        } else {
            setGameOver(true);
        }
    };

    const currentQuestion = questions[questionIndex];

    return (
        <View style={styles.container}>
            {timer > 0 ? (
                <Text>Starting in {timer} seconds...</Text>
            ) : (
                <View style={styles.questionBlock}>
                    <Text style={{ fontSize: 40, marginBottom: 10, color: currentQuestion.inkColor, fontWeight: 'bold' }}>
                        {currentQuestion.color}
                    </Text>
                    <Text>Time remaining: {questionTimer} seconds</Text>
                    <View style={styles.optionsContainer}>
                        {currentQuestion.options.map((option, index) => (
                            <TouchableOpacity key={index} onPress={() => handleAnswer(option)} style={styles.optionButton}>
                                <Text style={styles.optionText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    questionBlock: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    optionButton: {
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aa18ea',
        marginHorizontal: 10,
        borderRadius: 15,
    },
    optionText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
});

export default WordEasy;
