import { View, Image, StyleSheet, TouchableOpacity, Text, ImageBackground, Share } from 'react-native';
import app from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import Authentication from './authentication';



const auth = getAuth(app);


const CustomDrawerContent = (props) => {
    const user = Authentication();
    const shareApp = async () => {
        try {
            const result = await Share.share({
                message:
                'Stroop App | Hey! found this awesome cognitive test app. Like to try?',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                // shared with activity type of result.activityType
                } else {
                // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
            } catch (error) {
            Alert.alert(error.message);
        }
    };
    
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#8200d6'}}>
                <ImageBackground source={require('../assets/bg.jpg')} style={{padding: 20, marginTop: -50, paddingTop: 70}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Image source={require('../assets/boy.png')} style={{height: 80, width: 80, borderRadius: 40, marginBottom: 10}} />
                        <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>{user ? user.displayName : 'Guest'}</Text>
                    </View>
                </ImageBackground>

                <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
                    <DrawerItemList {...props}/>
                </View>
                
            </DrawerContentScrollView>

            <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
                <TouchableOpacity onPress={()=>{shareApp()}} style={{paddingVertical: 15}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text style={{fontSize: 15, marginLeft: 5}}>Tell a friend</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{auth.signOut()}} style={{paddingVertical: 15}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text style={{fontSize: 15, marginLeft: 5}}>Sign Out</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
        </View>
        
    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    
});