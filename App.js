import { StyleSheet } from 'react-native';
import Starter from './screens/starter/Starter';
import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import UserStack from './screens/user/UserStack';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from './firebaseConfig';
import { NavigationContainer } from '@react-navigation/native';


const auth = getAuth(app)

export default function App() {
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);

    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsUserSignedIn(true);
          } else {
            setIsUserSignedIn(false);
          }
        });

        return () => unsubscribe();
    }, []);

    return (
        <NavigationContainer style={styles.container}>
            {isUserSignedIn ? <UserStack /> : <Starter />}
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
