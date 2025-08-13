'use client';

import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const router = useRouter();

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>You are not logged in.</Text>
                <Button title="Go to Login" onPress={() => router.push('/login')} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome, {user.name}!</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    text: { fontSize: 20, marginBottom: 16 },
});