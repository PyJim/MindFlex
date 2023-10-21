import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Authentication from '../../Hooks/authentication';


const Home = ({navigation}) => {

    const user = Authentication();

    const [activeButton, setActiveButton] = useState(undefined);

    const handleButtonPress = (buttonName) => {
        setActiveButton(buttonName);
    };

    const getButtonStyle = (buttonName) => {
        return buttonName === activeButton ? styles.selectedButton : styles.button;
    };

    const getButtonTextStyle = (buttonName) => {
        if (buttonName === activeButton) {
            return styles.selectedButtonText;
        } else {
            return [styles.buttonText];
        }
    };
    const getSubButtonTextStyle = (buttonName) => {
        if (buttonName === activeButton) {
            return styles.selectedButtonText;
        } else {
            return [styles.buttonSubText];
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Hello {user ? user.displayName: 'Guest'}</Text>
                <TouchableOpacity onPress={() => {navigation.openDrawer()}}>
                    <Image source={require('../../assets/boy.png')} style={styles.headerImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <ImageBackground source={require('../../assets/bg.jpg')} style={styles.image}>
                    <Text style={styles.imageText}>The Stroop Effect</Text>
                </ImageBackground>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleButtonPress('WordEasy')} style={[styles.button, getButtonStyle('WordEasy')]}>
                    <Text style={[styles.buttonText, getButtonTextStyle('WordEasy')]}>Word Test</Text>
                    <Text style={[styles.buttonSubText, getSubButtonTextStyle('WordEasy')]}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress('WordHard')} style={[styles.button, getButtonStyle('WordHard')]}>
                    <Text style={[styles.buttonText, getButtonTextStyle('WordHard')]}>Word Test</Text>
                    <Text style={[styles.buttonSubText, getSubButtonTextStyle('WordHard')]}>Hard</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleButtonPress('InkEasy')} style={[styles.button, getButtonStyle('InkEasy')]}>
                    <Text style={[styles.buttonText, getButtonTextStyle('InkEasy')]}>Ink Test</Text>
                    <Text style={[styles.buttonSubText, getSubButtonTextStyle('InkEasy')]}>Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleButtonPress('InkHard')} style={[styles.button, getButtonStyle('InkHard')]}>
                    <Text style={[styles.buttonText, getButtonTextStyle('InkHard')]}>Ink Test</Text>
                    <Text style={[styles.buttonSubText, getSubButtonTextStyle('InkHard')]}>Hard</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {navigation.navigate(activeButton)}} 
                style={[
                    styles.startButton,
                    activeButton === undefined ? { backgroundColor: 'gray' } : {},
                ]}
                disabled={activeButton === undefined}>
                <Text style={styles.startButtonText}>START TEST</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 50,
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        paddingHorizontal: '8%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    headerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    imageContainer: {
        width: '100%',
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        marginVertical: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        overflow: 'hidden',
    },
    imageText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },
    buttonContainer: {
        width: '85%',
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        width: '49%',
        borderColor: '#8200d6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
    },
    selectedButton: {
        backgroundColor: '#8200d6',
        borderColor: '#8200d6',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        paddingVertical: 10,
        color: '#8200d6',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
    },
    selectedButtonText: {
        textAlign: 'center',
        fontSize: 18,
        paddingVertical: 10,
        color: 'white',
        fontWeight: 'bold',
    },
    buttonSubText: {
        color: '#8200d6',
        fontSize: 14,
        opacity: 0.5,
    },
    startButton: {
        width: '90%',
        height: 60,
        backgroundColor: '#8200d6',
        marginTop: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    startButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
});
