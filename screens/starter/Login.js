import React, { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView, TouchableOpacity, Text, TextInput, Image, StyleSheet, View, ActivityIndicator } from "react-native";
import app from "../../firebaseConfig";
import { Link } from "@react-navigation/native";
import Home from "../user/Home";

const auth = getAuth(app)

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signinMsg, setSigninMsg] = useState('Yes');
    const [msgColor, setMsgColor] = useState('transparent');
    const [isLoading, setIsLoading] = useState(false);

    async function signinUser(email, password) {
        if (email === '' || password === '') {
            setSigninMsg('Required field empty');
            setMsgColor('red');
            return;
        }

        setIsLoading(true); // Set loading state

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // navigation.replace('Home', { currentUser: user })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message.split('/')[1].slice(0, -2).replace(/-/g, ' ');
                setSigninMsg(errorMessage);
                setMsgColor('red');
            })
            .finally(() => {
                setIsLoading(false); // Reset loading state
            });
    }

    const handleCreateUser = () => {
        signinUser(email, password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={require('../../assets/girl.png')} />
            <Text style={{ color: msgColor }}>{signinMsg}</Text>
            <TextInput style={styles.textInput} placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <TextInput style={styles.textInput} placeholder="Password" value={password} secureTextEntry onChangeText={(text) => setPassword(text)} />
            <TouchableOpacity style={styles.signinButton} onPress={handleCreateUser}>
                <Text style={styles.signinText}>Login</Text>
            </TouchableOpacity>
            {isLoading && (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#aa18ea" />
                </View>
            )}
            <Text style={{ color: '#00001C', fontSize: 16, textAlign: 'center', opacity: 0.5 }}>
                Do not have an account? <Link to={{ screen: 'Signup' }} style={{ fontWeight: 'normal', opacity: 1, color: '#8200d6' }}>Register</Link>
            </Text>
        </SafeAreaView>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 150,
        height: 150,
        marginVertical: 20
    },
    textInput: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#666',
        borderWidth: 1,
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    signinButton: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aa18ea'
    },
    signinText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff',
        opacity: 0.8,
    },
    loading: {
        marginTop: 10,
    }
})
