import { StyleSheet } from 'react-native';
import Starter from './screens/starter/Starter';
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import UserStack from './screens/user/UserStack';
import { NavigationContainer } from '@react-navigation/native';
import Authentication from './Hooks/authentication';


export default function App() {
    const user = Authentication();

    return (
        <NavigationContainer style={styles.container}>
            {user ? <UserStack /> : <Starter />}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
