import React from "react";
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Linking, Image } from "react-native";
import Authentication from "../../Hooks/authentication";

const openURL = () => {
    Linking.openURL('https://jimmyessel.tech');
};

const About = ({navigation}) =>{
    const user = Authentication();
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Hello {user ? user.displayName: 'Guest'}</Text>
                <TouchableOpacity onPress={() => {navigation.openDrawer()}}>
                    <Image source={require('../../assets/boy.png')} style={styles.headerImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <Text style={styles.mainHead}>About</Text>
                <Text style={styles.subHead}>Version</Text>
                <Text style={styles.text}>1.0.0</Text>
                <Text style={styles.subHead}>Description</Text>
                <Text style={styles.text}>Elevate your cognitive prowess with Stroop Challenge, the ultimate app designed to test and improve your cognitive flexibility, attention, and reaction time. Engage in captivating game-like quizzes based on the classic Stroop test, where you'll need to quickly and accurately identify the color of words rather than their meaning. Track your progress, compete with friends, and share your achievements as you embark on a journey to sharpen your mental edge. Stroop Challenge offers a fun, accessible, and scientifically-proven way to boost your brain health, making it a must-have app for anyone seeking to enhance their cognitive abilities.</Text>
                <Text style={styles.subHead}>Developer</Text>
                <Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 16 }} onPress={openURL}>Click to see the developer's profile</Text>
            </View>
        </SafeAreaView>
    )
};

export default About;

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
        paddingVertical: 10,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 3,
        borderBlockColor: 'rgba(0, 0, 0, 0.06)'
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
    mainContainer: {
        width: '85%'
    },
    mainHead: {
        fontSize: 25,
        fontWeight: '600',
        marginVertical: 10,
        borderBottomColor: '#666',
        borderBottomWidth: 1,
        paddingVertical: 15
    },
    subHead: {
        fontSize: 20,
        marginVertical: 10,
    },
    text: {
        fontSize: 15,
        textAlign: 'justify',
        opacity: 0.7
    }
})