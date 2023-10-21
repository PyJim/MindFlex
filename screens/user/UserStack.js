import React from "react";
import { StyleSheet } from "react-native";
import DrawerNavigation from '../../Hooks/DrawerNavigation';


const UserStack = () =>{
    return (
            <DrawerNavigation />
    )
}


export default UserStack;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})