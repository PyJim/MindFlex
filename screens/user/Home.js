import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const Home = () =>{
    const route = useRoute()
    return (
        <SafeAreaView style={styles.container}>
            <Text>Welcome</Text>
        </SafeAreaView>
    )
}


export default Home;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})