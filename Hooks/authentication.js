import React, {useState, useEffect} from 'react';
import app from '../firebaseConfig';
import {getAuth, onAuthStateChanged, initializeAuth, getReactNativePersistence } from 'firebase/auth';


import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth(app);

const Authentication = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // User is authenticated
            setUser(currentUser);
        } else {
          // User is not authenticated
            setUser(null);
        }
    });

      // Clean up the subscription when the component unmounts
        return () => unsubscribe();
    }, []);

    return user;
};


export default Authentication;