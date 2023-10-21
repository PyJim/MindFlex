import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './customDrawer';

import About from '../screens/user/About';
import Beyond from '../screens/user/Beyond';
import Profile from '../screens/user/Profile';
import StackNavigator from './StackNavigator';

import Ionicons from '@expo/vector-icons/Ionicons';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props}/>} screenOptions={{
            headerShown: false,
                drawerActiveBackgroundColor: '#aa18ea',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333', 
                drawerLabelStyle: {marginLeft: -25, fontSize: 15}
            }}>
            <Drawer.Screen name="Stack" component={StackNavigator} options={{
                drawerIcon: ({color})=>(
                    <Ionicons name="home-outline" size={22} color={color}/>
                ), title: 'Home'
            }}/>
            <Drawer.Screen name="Beyond" component={Beyond} options={{
                drawerIcon: ({color})=>(
                    <Ionicons name="color-wand-outline" size={22} color={color}/>
                ), title: 'Stroop Effect'
            }}/>
            <Drawer.Screen name="About" component={About} options={{
                drawerIcon: ({color})=>(
                    <Ionicons name="book-outline" size={22} color={color} />
                )
            }}/>
            <Drawer.Screen name="Profile" component={Profile} options={{
                drawerIcon: ({color})=>(
                    <Ionicons name="person-outline" size={22} color={color}/>
                )
            }}/>
        </Drawer.Navigator>
    );
};
export default DrawerNavigation;
