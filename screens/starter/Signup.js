import {React, useState} from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView, TouchableOpacity, Text, TextInput, Image, StyleSheet, View } from "react-native";
import app from "../../firebaseConfig";
import { Link } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

const auth = getAuth(app)


const Signup = ({navigation}) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] =  useState('')
    const [signupMsg, setSignupMsg] = useState('Yes')
    const [msgColor, setMsgColor] = useState('white')

    async function createUser (email, password){
        if (email === '' || password === ''){
            setSignupMsg('Required field empty')
            setMsgColor('red')
            return;
        }
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setSignupMsg(`Account for ${user.email} successfully created!`)
            setMsgColor('green')
            navigation.push('Login')
            return;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setSignupMsg(`${errorMessage}!`)
            setMsgColor('red')
            return;
        });
    }

    const handleCreateUser = () => {
        createUser(email, password)
    };
    
    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={require('../../assets/boy.png')}/>
            <Text style={{color: msgColor}}>{signupMsg}</Text>
            <TextInput style={styles.textInput}
                placeholder="Email" value={email}
                onChangeText={(text) => setEmail(text)}/>
            <TextInput style={styles.textInput} 
                placeholder="Password" value={password}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}/>
            <TouchableOpacity style={styles.signinButton} onPress={handleCreateUser}>
                <Text style={styles.signinText}>Sign up</Text>
            </TouchableOpacity>
            <Text style={{color: '#00001C',
                fontSize: 20,
                textAlign: 'center',
                opacity: 0.5}}>Already have an account? <Link to={{screen: 'Login'}} style={{
                    fontWeight: 'bold', opacity: 1,
                }}>Login</Link></Text>
        </SafeAreaView>
    )
}


export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 20
    },
    textInput: {
        width: 280,
        height: 50,
        borderWidth: 2,
        borderColor: '#00001C',
        marginVertical: 10,
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    signinButton: {
        width: 150,
        height: 45,
        backgroundColor: '#00001C',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signinText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#ffffff',
        opacity: 0.8,
    }

})