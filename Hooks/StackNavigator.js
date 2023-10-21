import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import InkEasy from '../screens/user/InkEasy';
import InkHard from '../screens/user/InkHard';
import WordEasy from '../screens/user/WordEasy';
import WordHard from '../screens/user/WordHard';
import Home from '../screens/user/Home';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="InkEasy" component={InkEasy} options={{ title: 'Ink Color Test - Easy' }} />
            <Stack.Screen name="InkHard" component={InkHard} options={{ title: 'Ink Color Test - Hard' }} />
            <Stack.Screen name="WordEasy" component={WordEasy} options={{ title: 'Word Color Test - Easy' }}/>
            <Stack.Screen name="WordHard" component={WordHard} options={{ title: 'Word Color Test - Hard' }}/>
        </Stack.Navigator>
    );
};

export default StackNavigator;
