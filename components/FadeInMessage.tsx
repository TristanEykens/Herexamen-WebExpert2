import React from 'react';
import { StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function FadeInMessage() {
    return (
        <Animatable.View
            animation="fadeInDown"
            duration={1200}
            style={styles.container}
        >
            <Text style={styles.text}>Welcome to my App! 🎉</Text>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#03dac6',
        padding: 12,
        borderRadius: 10,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});