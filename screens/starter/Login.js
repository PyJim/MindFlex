import {React, useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView, TouchableOpacity, Text, TextInput, Image, StyleSheet } from "react-native";
import app from "../../firebaseConfig";
import { Link } from "@react-navigation/native";
import Home from "../user/Home";

const auth = getAuth(app)


const Login = ({navigation}) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] =  useState('')
    const [signinMsg, setSigninMsg] = useState('Yes')
    const [msgColor, setMsgColor] = useState('white')

    async function signinUser(email, password){
        if (email === '' || password === ''){
            setSigninMsg('Required field empty')
            setMsgColor('red')
            return;
        }
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // navigation.replace('Home', {currentUser: user})
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setSigninMsg(errorMessage)
                setMsgColor('red')
            });
    }

    const handleCreateUser = () => {
        signinUser(email, password)
    };
    
    return(
        <SafeAreaView style={styles.container}>
            <Image style={styles.image} source={require('../../assets/girl.png')}/>
            <Text style={{color: msgColor}}>{signinMsg}</Text>
            <TextInput style={styles.textInput}
                placeholder="Email" value={email}
                onChangeText={(text) => setEmail(text)}/>
            <TextInput style={styles.textInput} 
                placeholder="Password" value={password}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}/>
            <TouchableOpacity style={styles.signinButton} onPress={handleCreateUser}>
                <Text style={styles.signinText}>Login</Text>
            </TouchableOpacity>
            <Text style={{color: '#00001C',
                fontSize: 20,
                textAlign: 'center',
                opacity: 0.5}}>Do not have an account? <Link to={{screen: 'Signup'}} style={{
                    fontWeight: 'bold', opacity: 1,
                }}>Register</Link></Text>
        </SafeAreaView>
    )
}


export default Login;

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