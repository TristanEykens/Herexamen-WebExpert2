'use client';

import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
    const { user, login } = useAuth();
    const router = useRouter();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const success = await login(name, password);
        if (success) {
            Alert.alert('Login successful!', `Welcome, ${name}!`);
            router.push('/profile'); // redirect to profile after login
        } else {
            Alert.alert('Login failed', 'Please check your credentials.');
        }
    };

    if (user) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>You are already logged in as {user.name}.</Text>
                <Button title="Go to Profile" onPress={() => router.push('/profile')} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
    input: {
        width: '80%',
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    text: { fontSize: 18, marginBottom: 16 },
});