import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Image, ImageBackground, Linking } from 'react-native';
import Authentication from '../../Hooks/authentication';
import { ScrollView } from 'react-native-gesture-handler';



const openURL = () => {
    Linking.openURL('https://en.wikipedia.org/wiki/Stroop_effect');
};

const Beyond = ({navigation}) => {

    const user = Authentication();
    return (
        <SafeAreaView style={{paddingVertical: 50}}>
            <ImageBackground>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Hello {user ? user.displayName: 'Guest'}</Text>
                    <TouchableOpacity onPress={() => {navigation.openDrawer()}}>
                        <Image source={require('../../assets/boy.png')} style={styles.headerImage} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <ScrollView contentContainerStyle={{alignItems: 'center', marginBottom: 50}}>
                
                <View style={{alignItems: 'center', justifyContent: 'center', marginBottom: 100, width: '85%', paddingVertical: 20}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: '#333', borderBottomWidth: 1, borderBottomColor: '#333'}}>THE STROOP EFFECT</Text>
                    <Text style={styles.textStyle}>Regularly taking the Stroop test can be beneficial for several reasons, especially if you have a specific purpose or goal in mind. Here are some potential reasons why you might consider taking the Stroop test on a regular basis:</Text>
                    <Text style={styles.textStyle}>Cognitive Assessment: The Stroop test is a well-established tool for assessing cognitive functioning, particularly executive functions like attention, inhibition, and cognitive flexibility. Regular testing can help you track changes in your cognitive abilities over time.</Text>
                    <Text style={styles.textStyle}>Baseline Measurement: Establishing a baseline performance on the Stroop test can be helpful for understanding your cognitive strengths and weaknesses. This baseline can serve as a point of reference for assessing any changes in your cognitive abilities in the future.</Text>
                    <Text style={styles.textStyle}>Monitoring Cognitive Health: Regular testing can be especially useful for older adults who want to monitor their cognitive health and detect early signs of cognitive decline. Changes in Stroop test performance could be indicative of cognitive issues that might require further evaluation.</Text>
                    <Text style={styles.textStyle}>Training and Improvement: Some individuals use the Stroop test as part of cognitive training programs. Regular practice and tracking can help you assess your progress and improvements in areas like attention, impulse control, and cognitive flexibility.</Text>
                    <Text style={styles.textStyle}>Research or Academic Purposes: Researchers and students in psychology or related fields may use the Stroop test for experiments or academic projects. Regular testing could be a requirement or part of ongoing research.</Text>
                    <Text style={styles.textStyle}>Therapeutic Purposes: In clinical or therapeutic settings, the Stroop test may be used as part of cognitive rehabilitation programs for conditions that affect executive functions. Regular testing can help gauge the effectiveness of such interventions.</Text>
                    <Text style={styles.textStyle}>Professional or Educational Goals: In some cases, employers or educational institutions may require regular cognitive assessments, including the Stroop test, as part of their screening or evaluation process.</Text>
                    <Text style={styles.textStyle}>It's important to note that while regular Stroop testing can be useful for the purposes mentioned above, it's typically not necessary for most individuals as part of their daily routine. The frequency and necessity of Stroop testing should be determined based on your specific goals and needs. If you're considering regular Stroop testing for cognitive health or improvement, it's a good idea to consult with a healthcare professional or cognitive psychologist who can provide guidance and recommendations tailored to your situation.</Text>
                    <Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 18 }} onPress={openURL}>Click here to read more</Text>

                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

export default Beyond;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 50,
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        paddingHorizontal: '8%',
        paddingVertical: 10,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 3,
        borderBlockColor: 'rgba(0, 0, 0, 0.06)'
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
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        marginVertical: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        overflow: 'hidden',
    }
    ,
    imageText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },
    textStyle: {
        fontSize: 18,
        textAlign: 'justify',
        width: '100%',
        color: '#666',
        marginVertical: 10
    }
});
