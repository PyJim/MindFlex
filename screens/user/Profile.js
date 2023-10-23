import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert, // Import Alert
    } from 'react-native';
    import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';

    import Authentication from '../../Hooks/authentication';

    const Profile = ({ navigation }) => {
    const user = Authentication();

    const [displayName, setDisplayName] = useState(user && user.displayName ? user.displayName : '');
    const [email, setEmail] = useState(user && user.email ? user.email : '');
    const [password, setPassword] = useState(user && user.password ? user.password : '');
    const [confirmPassword, setConfirmPassword] = useState(user && user.password ? user.password : '');
    const [message, setMessage] = useState('No changes made');
    const [refreshKey, setRefreshKey] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveChanges = async () => {
        // Show a confirmation dialog
        Alert.alert(
        'Save Changes',
        'Are you sure you want to save these changes?',
        [
            {
            text: 'Cancel',
            onPress: () => console.log('Save Changes canceled'),
            style: 'cancel',
            },
            {
            text: 'Save Changes',
            onPress: async () => {
                setIsLoading(true); // Set loading state

                if (password !== confirmPassword) {
                setIsLoading(false); // Reset loading state
                Alert.alert('Password does not match.');
                return;
                }

                const auth = getAuth();
                const currentUser = auth.currentUser;

                const isDisplayNameChanged = displayName !== currentUser.displayName;
                const isEmailChanged = email !== currentUser.email;
                const isPasswordChanged = password !== currentUser.password;

                try {
                if (isDisplayNameChanged) {
                    await updateProfile(currentUser, {
                    displayName: displayName,
                    });
                }

                if (isEmailChanged) {
                    await updateEmail(currentUser, email);
                }

                if (isPasswordChanged) {
                    await updatePassword(currentUser, password);
                }

                setIsLoading(false); // Reset loading state
                Alert.alert('Changes saved successfully. It may take a while to show.');
                } catch (error) {
                setIsLoading(false); // Reset loading state
                Alert.alert('An error occurred while saving changes. Please try again later.');
                }
                setRefreshKey(1);
            },
            },
        ],
        { cancelable: false }
        );
    };

    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset="-300" style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Hello {user ? user.displayName : 'Guest'}</Text>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={require('../../assets/boy.png')} style={styles.headerImage} />
            </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
            <Image source={require('../../assets/boy.png')} style={styles.Image} />
        </View>
        <TextInput
            placeholder="Name"
            style={styles.textInput}
            value={displayName}
            onChangeText={(text) => setDisplayName(text)}
        />
        <TextInput
            placeholder="Email"
            style={styles.textInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
        />
        <TextInput
            placeholder="Confirm Password"
            style={styles.textInput}
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
            <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>Save Changes</Text>
        </TouchableOpacity>
        {isLoading && (
            <View style={styles.loading}>
            <ActivityIndicator size="large" color="#aa18ea" />
            </View>
        )}
        </KeyboardAvoidingView>
    );
};

export default Profile;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        justifyContent: 'center',
    },
    innerContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        paddingHorizontal: '8%',
        paddingVertical: 10,
        height: 80,
        flexDirection: 'row',
        marginTop: -60,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 3,
        borderBlockColor: 'rgba(0, 0, 0, 0.06)',
    },
    headerText: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    headerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 70,
        marginBottom: 50,
    },
    Image: {
        width: 120,
        height: 120,
        borderRadius: 75,
    },
    textInput: {
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#666',
        borderWidth: 1,
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    button: {
        width: '80%',
        height: 50,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#aa18ea',
    },
    loading: {
        marginTop: 10,
    },
});
